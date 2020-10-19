import React, { FC, ReactNode } from 'react';
import FormLabel from '../FormLabel/FormLabel';

interface FileUploadProps {
  id: string;
  accept?: string;
  label: ReactNode;
}

const FileUpload: FC<FileUploadProps> = ({
  label,
  accept,
  id,
}) => (
  <>
    <FormLabel inputId={id}>{label}</FormLabel>
    <input
      type="file"
      id={id}
      name="hmmm"
      accept={accept}
    />
  </>
);

export default FileUpload;
