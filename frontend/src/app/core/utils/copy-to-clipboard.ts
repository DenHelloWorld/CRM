import { formatDate } from '@angular/common';

export const copyToClipboard = (
  value: string,
  label: string = 'Value',
): void => {
  navigator.clipboard.writeText(value).then(
    () => {
      console.log(`${label} copied successfully: ${value}`);
    },
    (err) => {
      console.error(`Error copying ${label}: ${err}`);
    },
  );
};

export const copyDateToClipboard = (
  date: string | Date,
  label: string = 'Date',
  format: string = 'yyyy-MM-dd HH:mm:ss',
  locale: string = 'en-US',
): void => {
  const formattedDate = formatDate(date, format, locale);
  navigator.clipboard.writeText(formattedDate).then(
    () => {
      console.log(`${label} copied successfully: ${formattedDate}`);
    },
    (err) => {
      console.error(`Error copying ${label}: ${err}`);
    },
  );
};
