export const PROVINCES = {
  Alberta: 'AB',
  'British Columbia': 'BC',
  Manitoba: 'MB',
  'New Brunswick': 'NB',
  'Newfoundland and Labrador': 'NL',
  'Northwest Territories': 'NT',
  'Nova Scotia': 'NS',
  Nunavut: 'NU',
  Ontario: 'ON',
  'Prince Edward Island': 'PE',
  Québec: 'QC',
  Saskatchewan: 'SK',
  Yukon: 'YT',
};

export const JOBTYPES = {
  'Full Time': 'ft',
  'Part Time': 'pt',
};

export const JOBSITE1 = {
  jobsiteName: 'indigenous',
  //colour theme : taupe
  endpoint: '/jobsite1',
  colours: {
    background: 'bg-[#F9F9F9]',
    backgroundDark: 'bg-[#1a1a27]',
    base: 'bg-[#483C32]',
    baseText: 'text-[#483C32]',
    buttonHover: 'bg-[#2F2520]',
    buttonText: 'text-white',
  },
};

export const JOBSITE2 = {
  jobsiteName: 'newcomers',
  endpoint: '/jobsite2',
  //colour theme : blue
  colours: {
    background: 'bg-[#f0f9ff]',
    backgroundDark: 'bg-[#0f172a]',
    base: 'bg-[#0b5394]',
    baseText: 'text-[#0b5394]',
    buttonHover: 'bg-[#0a4480]',
    buttonText: 'text-white',
  },
};

export const JOBSITE3 = {
  jobsiteName: 'disabled',
  endpoint: '/jobsite3',
  //colour theme : gray
  colours: {
    background: 'bg-[#f3f4f6]',
    backgroundDark: 'bg-[#1f2937]',
    base: 'bg-[#6b7280]',
    baseText: 'text-[#6b7280]',
    buttonHover: 'bg-[#4b5563]',
    buttonText: 'text-white',
  },
};

export const JOBSITE4 = {
  jobsiteName: 'students',
  endpoint: '/jobsite4',
  //colour theme : green
  colours: {
    background: 'bg-[#f3f4f6]',
    backgroundDark: 'bg-[#1f2937]',
    base: 'bg-[#006400]',
    baseText: 'text-[#006400]',
    buttonHover: 'bg-[#004000]',
    buttonText: 'text-white',
  },
};

export const JOBSITE5 = {
  jobsiteName: 'asylum-refugees',
  endpoint: '/jobsite5',
  //colour theme : teal
  colours: {
    background: 'bg-[#e6f2f2]',
    backgroundDark: 'bg-[#1a1a27]',
    base: 'bg-[#008080]',
    baseText: 'text-[#008080]',
    buttonHover: 'bg-[#006060]',
    buttonText: 'text-white',
  },
};
