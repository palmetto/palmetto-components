import React, { useRef, FC, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import FormLabel from '../FormLabel/FormLabel';
import Button from '../Button/Button';

interface FileUploadProps {
  id: string;
  accept?: string;
  label: ReactNode;
}

const FileUpload: FC<FileUploadProps> = ({
  label,
  accept,
  id,
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput?.current) hiddenFileInput.current.click();
  };

  return (
    <>
      <FormLabel inputId={id}>
        <Button onClick={handleClick}>
          <FontAwesomeIcon icon={faCloudUploadAlt} className="m-right-xs" />
          Upload File
          <input
            ref={hiddenFileInput}
            className="display-none"
            type="file"
            id={id}
            name="hmmm"
            accept={accept}
          />
        </Button>
      </FormLabel>
    </>
  );
};

export default FileUpload;
