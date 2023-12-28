import React, {
  useRef, FC, ReactNode, ChangeEvent, MouseEvent,
} from 'react';
import mergeRefs from 'react-merge-refs';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { FormLabel } from '../FormLabel/FormLabel';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import { Button, ButtonSize } from '../Button/Button';
import styles from './FileUpload.module.scss';
import { IconName } from '../../types';

export interface FileUploadProps extends BoxProps {
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
   * Name of the icon displayed inside the button
   */
  iconName?: IconName;
  /**
   * Props passed directly to the input element of the component
   */
  inputProps?: BoxProps & React.HTMLProps<HTMLInputElement>;
  /**
   * Whether the file upload is disabled
   */
  isDisabled?: boolean;
  /**
   * Renders an outline version of the button. With a transparent background.
   */
  isOutlined?: boolean;
  /**
   * Determines if input is required or not
   */
  isRequired?: boolean;
  /**
   * Input `multiple` attribute, pass `true` if you wish to upload multiple files.
   */
  multiple?: boolean;
  /**
   * Input `multiple` attribute, pass `true` if you wish to upload multiple files.
   */
  onClearFiles?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: ReactNode;
  /**
   * Size of component. Matches Button sizes.
   */
  size?: ButtonSize;
  /**
   * Color for button component. Matches a curated subset of button variants.
   */
  variant?: 'light' | 'dark' | 'primary' | 'white' ;
  /**
   * Additional props to be spread. IMPORTANT: these will be spread ONLY to the
   * `input` element in the component since it is the actual semantic file input
   * present.
   */
  [x: string]: any; // eslint-disable-line
}

export const FileUpload: FC<FileUploadProps> = React.forwardRef<HTMLDivElement, FileUploadProps>((
  {
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
    iconName = 'upload',
    inputProps = undefined,
    isDisabled = false,
    isOutlined = false,
    isRequired = false,
    multiple = false,
    onClearFiles = undefined,
    requiredIndicator = <>&nbsp;*</>,
    size = 'md',
    variant = 'light',
    ...restProps
  },
  ref,
) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (hiddenFileInput?.current) hiddenFileInput.current.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputProps?.onChange) {
      inputProps.onChange(event);
    }

    onChange(event);
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
    <Box
      display="inline-block"
      className={className}
      width={fullWidth ? '100' : undefined}
      ref={ref}
      {...restProps}
    >
      <FormLabel inputId={id} className="display-none">
        {labelText}
      </FormLabel>
      <Box
        gap="xs"
        alignItems={{ base: 'flex-start', tablet: 'center' }}
        direction={{ base: 'column', tablet: 'row' }}
      >
        <Button
          onClick={handleClick}
          aria-controls={id}
          isDisabled={isDisabled}
          isOutlined={isOutlined}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
        >
          {/* We need the onClick handler here to prevent bubbling of clicks on the inner button elements */}
          {/* Implemented in response to Safari's handling of bubbled click events into the details element */}
          {/* which triggered default behavior of opening the details element on click */}
          <Box as="span" direction="row" onClick={(e: MouseEvent) => { e.preventDefault(); }}>
            {hasIcon && (
              <Icon
                name={iconName}
                className={classNames('align-self-center', { 'm-right-xs': buttonText })}
                data-testid="file-upload-icon"
              />
            )}
            {buttonText
              && (
                <Box data-testid="file-upload__upload-text">
                  {buttonText}
                </Box>
              )}
            {isRequired && requiredIndicator && <span>{requiredIndicator}</span>}
          </Box>
          <Box
            // We spread props here at that top to avoid inputProps overwriting high-level component props
            {...inputProps}
            as="input"
            ref={mergeRefs([hiddenFileInput, ...(inputProps?.ref ? [inputProps.ref] : [])])}
            className={classNames(styles['file-upload-input-element'], inputProps?.className)}
            type="file"
            id={id}
            name={name}
            accept={accept}
            onChange={handleInputChange}
            multiple={multiple}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            required={isRequired}
            aria-required={isRequired}
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
});
