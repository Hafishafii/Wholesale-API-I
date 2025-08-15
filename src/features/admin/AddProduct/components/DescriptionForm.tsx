import type{ FC } from 'react';

interface DescriptionFormProps {
  description: string;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const DescriptionForm: FC<DescriptionFormProps> = ({ description, onDescriptionChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Description</h2>
      <textarea
        name="description"
        value={description}
        onChange={onDescriptionChange}
        placeholder="Write a short description about the product"
        className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-700 h-28"
      />
    </div>
  );
};
