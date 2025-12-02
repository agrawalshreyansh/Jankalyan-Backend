/**
 * Date and Time utility functions
 */

/**
 * Converts a date to ISO format for database storage
 * @param date - Date object or date string
 * @returns ISO string representation of the date
 */
export const toISOString = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
};

/**
 * Converts a date to Indian Standard Time (IST) format for display/storage
 * Format: YYYY-MM-DD HH:mm:ss (24-hour format)
 * @param date - Date object or date string
 * @returns Formatted date string in IST
 */
export const toISTFormat = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString("en-CA", {
    timeZone: "Asia/Kolkata",
    hour12: false
  }).replace(",", "");
};

/**
 * Parses a custom date string format 'DD/MM/YYYY, HH:MM:SS' to Date object
 * @param dateString - Date string in format 'DD/MM/YYYY, HH:MM:SS'
 * @returns Date object
 * @throws Error if the format is invalid
 */
export const parseCustomDateFormat = (dateString: string): Date => {
  // Expected format: '28/11/2025, 00:42:08'
  const parts = dateString.split(', ');

  if (parts.length !== 2) {
    throw new Error('Invalid date format. Expected: DD/MM/YYYY, HH:MM:SS');
  }

  const datePart = parts[0]!;
  const timePart = parts[1]!;

  const dateParts = datePart.split('/').map(Number);
  const timeParts = timePart.split(':').map(Number);

  if (dateParts.length !== 3 || timeParts.length !== 3) {
    throw new Error('Invalid date format. Expected: DD/MM/YYYY, HH:MM:SS');
  }

  const day = dateParts[0]!;
  const month = dateParts[1]!;
  const year = dateParts[2]!;
  const hours = timeParts[0]!;
  const minutes = timeParts[1]!;
  const seconds = timeParts[2]!;

  // Validate that all values are numbers and within valid ranges
  if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    throw new Error('Invalid date values - non-numeric components found');
  }

  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    throw new Error('Invalid date values');
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
    throw new Error('Invalid time values');
  }

  // Create Date object (months are 0-indexed in JavaScript)
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

/**
 * Safely parses a date string, falling back to current date if parsing fails
 * @param dateString - Date string to parse
 * @param fallbackDate - Fallback date if parsing fails (defaults to current date)
 * @returns Date object
 */
export const safeParseDate = (dateString: string | undefined | null, fallbackDate?: Date): Date => {
  if (!dateString) {
    return fallbackDate || new Date();
  }

  try {
    // Try parsing as custom format first
    return parseCustomDateFormat(dateString);
  } catch {
    try {
      // Fall back to standard Date parsing
      const parsed = new Date(dateString);
      if (isNaN(parsed.getTime())) {
        throw new Error('Invalid date');
      }
      return parsed;
    } catch {
      console.warn(`Failed to parse date string: ${dateString}, using fallback`);
      return fallbackDate || new Date();
    }
  }
};

/**
 * Formats a date for display in a human-readable format
 * @param date - Date object or date string
 * @param locale - Locale for formatting (default: 'en-IN')
 * @returns Formatted date string
 */
export const formatForDisplay = (date: Date | string, locale: string = 'en-IN'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
  });
};

/**
 * Gets the current date and time in IST format
 * @returns Current date/time string in IST format
 */
export const getCurrentIST = (): string => {
  return toISTFormat(new Date());
};

/**
 * Checks if a date is valid
 * @param date - Date to validate
 * @returns True if date is valid, false otherwise
 */
export const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};