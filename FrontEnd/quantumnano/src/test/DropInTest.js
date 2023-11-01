import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FileDropIn from '../FileDropIn';

describe('FileDropIn', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<FileDropIn />);
    expect(getByText(/select a file or drag and drop here/i)).toBeInTheDocument();
  });

  it('handles drag and drop with valid csv', async () => {
    const { getByText } = render(<FileDropIn />);
    const dropArea = getByText(/select a file or drag and drop here/i);
    const data = new DataTransfer();
    data.items.add(new File(['header1,header2\nvalue1,value2'], 'test.csv', { type: 'text/csv' }));

    fireEvent.dragOver(dropArea);
    fireEvent.drop(dropArea, { dataTransfer: data });

    await waitFor(() => expect(getByText('test.csv')).toBeInTheDocument());
  });

  it('handles drag and drop with invalid file type', () => {
    const { getByText } = render(<FileDropIn />);
    const dropArea = getByText(/select a file or drag and drop here/i);
    const data = new DataTransfer();
    data.items.add(new File(['not,a,csv'], 'test.txt', { type: 'text/plain' }));

    fireEvent.dragOver(dropArea);
    fireEvent.drop(dropArea, { dataTransfer: data });

  });

  it('allows user to select a file via the file input', () => {
    const { getByText, getByLabelText } = render(<FileDropIn />);
    const input = getByLabelText(/select a file or drag and drop here/i);
    const file = new File(['header1,header2\nvalue1,value2'], 'test.csv', { type: 'text/csv' });

    userEvent.upload(input, file);

    expect(input.files[0]).toStrictEqual(file);
    expect(input.files).toHaveLength(1);
    expect(getByText('test.csv')).toBeInTheDocument();
  });
});

