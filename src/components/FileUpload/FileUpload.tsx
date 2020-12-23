import React, {
  useRef, FC, ReactNode, ChangeEvent, MouseEvent,
} from 'react';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import Button, { ButtonSize } from '../Button/Button';

export interface FileUploadProps {
  /**
   * Id for the file input element.
   */
  id: string;
  /**
   * Label to be used for input. It is required for accessibility reasons although it will not be displayed.
   */
  labelText: string;
  /**
   * Name attribute for input element.
   */
  name: string;
  /**
   * Callback fired when there is a change event on the file input.
   * Files can be accessed from this change event as `event.target.files`;
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * HTML attribute that specifies what type of files are accepted for upload.
   * [Read More](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)
   */
  accept?: string;
  /**
   * Text to be rendered in file input button.
   */
  buttonText?: ReactNode;
  /**
   * Custom classname to apply to component wrapper.
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: ReactNode;
  /**
   * The max number of characters displayed in file names.
   * The component will preserve the the first n / 2 characters and the last n / 2 characters,
   * including the file extension. It will only truncate characters in the middle, following
   * a native HTML file input.
   */
  fileNameMaxLength?: number;
  /**
   * File list array-like
   */
  files?: FileList;
  /**
   * Whether to render the button with 100% width.
   */
  fullWidth?: boolean;
  /**
   * Controls whether an upload icon is shown in the button.
   */
  hasIcon?: boolean;
  /**
   * Additional clarifying text to help describe the type of acceptable files
   */
  helpText?: ReactNode;
  /**
   * Whether the file upload is disabled.
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
  /**
   * Input `multiple` attribute, pass `true` if you wish to upload multiple files.
   */
  multiple?: boolean;
  /**
   * Input `multiple` attribute, pass `true` if you wish to upload multiple files.
   */
  onClearFiles?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Size of component. Matches Button sizes.
   */
  size?: ButtonSize;
  /**
   * Color for button component. Matches a curated subset of button variants.
   */
  variant?: 'light' | 'dark';
  /**
   * Additional props to be spread. IMPORTANT: these will be spread ONLY to the
   * `input` element in the component since it is the actual semantic file input
   * present.
   */
  [x: string]: any; // eslint-disable-line
}

const FileUpload: FC<FileUploadProps> = ({
  id,
  labelText,
  name,
  onChange,
  accept = undefined,
  buttonText = 'Upload File',
  className = undefined,
  error = null,
  fileNameMaxLength = null,
  files = null,
  fullWidth = false,
  hasIcon = true,
  helpText = undefined,
  isDisabled = false,
  isRequired = false,
  multiple = false,
  onClearFiles = undefined,
  size = 'md',
  variant = 'light',
  ...restProps
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput?.current) hiddenFileInput.current.click();
  };

  const truncateFileName = (fileName: string, maxLength: number): string => {
    const half = Math.floor(maxLength / 2);

    return `${fileName.substr(0, half)}...${fileName.substr(
      fileName.length - half,
      fileName.length,
    )}`;
  };

  const messageFontSize = () => {
    let fontSize: 'xs' | 'sm' | 'md' = 'sm';
    if (size === 'sm') {
      fontSize = 'xs';
    } else if (size === 'lg') {
      fontSize = 'md';
    }

    return fontSize;
  };

  const renderFiles = () => files && (
  <Box>
    {[...Array.from(files)].map((file: File) => (
      <p key={file.name} className={`font-size-${messageFontSize()} m-top-xs`}>
        <Icon name="paperclip" className="font-color-grey-light m-right-xs" />
        {fileNameMaxLength ? truncateFileName(file.name, fileNameMaxLength) : file.name}
      </p>
    ))}
  </Box>
  );

  return (
    <Box display="inline-block" className={className} width={fullWidth ? '100' : undefined}>
      <FormLabel inputId={id} className="display-none">
        {labelText}
      </FormLabel>
      <Box childGap="xs" alignItems="center" direction="row">
        <Button
          onClick={handleClick}
          aria-controls={id}
          isDisabled={isDisabled}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
        >
          {hasIcon && (
            <Icon
              name="upload"
              className="m-right-xs align-self-center"
              data-testid="file-upload__upload-icon"
            />
          )}
          {buttonText}
          {isRequired && <>&nbsp;*</>}
          <input
            ref={hiddenFileInput}
            className="display-none"
            type="file"
            id={id}
            name={name}
            accept={accept}
            onChange={onChange}
            multiple={multiple}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            required={isRequired}
            {...restProps}
          />
        </Button>
        {helpText && (
          <Box as="p" display="block" fontSize="sm" color="grey">
            {helpText}
          </Box>
        )}
      </Box>
      {error && error !== true && (
        <InputValidationMessage size={messageFontSize()}>{error}</InputValidationMessage>
      )}
      {renderFiles()}
      {files && onClearFiles && (
        <Button variant="light" isOutlined size="xs" onClick={onClearFiles} className="m-top-xs">
          Clear
        </Button>
      )}
    </Box>
  );
};

export default FileUpload;
