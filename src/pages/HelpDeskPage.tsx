import  { useState } from 'react';
import StackHeaderLayout from '../components/layouts/StackHeaderLayout';

export default function HelpDeskPage() {
  const [question, setQuestion] = useState('');
  return (
    <StackHeaderLayout title="Help Desk">
      <div className="bg-white p-6 mt-10 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
        <textarea
          placeholder="How can we help you?"
          className="w-full border px-3 py-2 rounded h-32 resize-none"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit</button>
      </div>
    </StackHeaderLayout>
  );
}
