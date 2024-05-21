import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';

const employmentSubTypeMap = {
  ft: 'Full time',
  pt: 'Part time',
};

// Function to get the total number of job postings
export async function getTotalNumberOfPostings(siteCriteria, filterCriteria) {
  await connectMongoDB();

  const Posting = mongoose.models.posting || mongoose.model('posting', posting);
  const filterObject = await createFilterObject(filterCriteria);
  const totalNumberOfPostings = await Posting.countDocuments({
    ...siteCriteria,
    ...filterObject,
  });

  return totalNumberOfPostings;
}

// Function to get email addresses with the 'sent' field
export async function getEmailAddressesWithSentField(params) {
  const sortBy = params.get('sort');
  const sortCriteria = sortBy ? JSON.parse(sortBy) : null;

  await connectMongoDB();

  const Posting = mongoose.models.posting || mongoose.model('posting', posting);

  // Define the aggregation pipeline to perform operations on the documents
  let aggregationPipeline = [
    {
      // Group documents by the 'email' field, and for each group,
      // create a new field 'sent' containing the value of the 'sent' field
      $group: {
        _id: '$email',
        sent: { $first: '$sent' }, // Include the 'sent' field from the first document in each group
      },
    },
    {
      // Project stage: Reshape the documents to include only the 'email' and 'sent' fields,
      // while replacing the '_id' field name to 'email'
      $project: {
        email: '$_id', // Rename '_id' to 'email'
        sent: 1,
        _id: 0,
      },
    },
  ];

  if (sortCriteria) {
    aggregationPipeline.push({
      $sort: { sent: sortCriteria },
    });
  }

  // Execute the aggregation pipeline
  let emailAddresses = await Posting.aggregate(aggregationPipeline);

  return emailAddresses;
}

// Function to extract pagination parameters
export function getPaginationParams(req) {
  const pageSize = 25;
  const pageNum = parseInt(req.nextUrl.searchParams.get('page_num'));
  const skip = isNaN(pageNum) || pageNum < 1 ? 0 : (pageNum - 1) * pageSize;
  return { skip, pageSize };
}

// Function to handle errors
export function handleError(error) {
  console.error('Error fetching job postings:', error);

  // Check error status and return appropriate response
  if (error instanceof SyntaxError || error instanceof TypeError) {
    // Malformed or invalid request
    return NextResponse.json(
      { message: 'Bad Request - The request is malformed or invalid' },
      { status: 400 }
    );
  } else {
    // Other server error
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Function to fetch and sort job postings by date
export async function fetchJobPostings(
  siteCriteria,
  sortCriteria,
  filterCriteria,
  skip,
  pageSize
) {
  await connectMongoDB();

  const Posting = mongoose.models.posting || mongoose.model('posting', posting);
  const filterObject = await createFilterObject(filterCriteria);

  // Query job postings with pagination
  const jobPostings = await Posting.find({ ...siteCriteria, ...filterObject })
    .sort(sortCriteria)
    .skip(skip)
    .limit(pageSize);

  return jobPostings;
}

// Function to check if the requested field exists in the schema
export async function checkFieldExist(requestedObject) {
  await connectMongoDB();

  const Posting = mongoose.models.posting || mongoose.model('posting', posting);
  const field = Object.keys(requestedObject)[0];

  return Posting.schema.path(field) !== undefined;
}

// Function to parse sort criteria
export async function parseSortCriteria(sortBy) {
  return sortBy ? JSON.parse(sortBy) : null;
}

// Function to parse filter criteria
export async function parseFilterCriteria(etFilters, pFilters) {
  const etFilterCriteria = etFilters.map(et => ({
    employmentSubType: employmentSubTypeMap[et],
  }));

  const pFilterCriteria = pFilters.map(p => ({ addressRegion: p }));

  return [...etFilterCriteria, ...pFilterCriteria];
}

// Function to create a filter object
export async function createFilterObject(filterCriteria) {
  return filterCriteria.reduce((acc, filter) => {
    // Check if the key already exists in the accumulator
    if (Object.prototype.hasOwnProperty.call(acc, Object.keys(filter)[0])) {
      // If the key exists, push the value to an array
      acc[Object.keys(filter)[0]].push(Object.values(filter)[0]);
    } else {
      // If the key doesn't exist, initialize it as an array with the value
      acc[Object.keys(filter)[0]] = [Object.values(filter)[0]];
    }
    return acc;
  }, {});
}
