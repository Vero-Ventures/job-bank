import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import { CircleCheckIcon, CircleXIcon } from '@/components/icons';

const AdminPage = ({ data, sendEmail, massSendEmails }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600"
            onClick={massSendEmails}>
            Mass Send Emails
          </Button>
        </div>
      </header>
      <main className="flex-1 p-2">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email Contacted Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(({ sent, email }, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center ">
                      <span className="mr-1">{email}</span>
                      {sent ? (
                        <CircleCheckIcon className="text-green-500 mr-2" />
                      ) : (
                        <CircleXIcon className="text-red-500 mr-2" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => sendEmail(email)}>
                      Send Email
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};
AdminPage.displayName = 'AdminPage';

export { AdminPage };
