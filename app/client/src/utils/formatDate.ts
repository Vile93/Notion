export const formatDate = (date: Date) => {
    try {
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const formattedDate = dateFormatter.format(date);
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const formattedTime = timeFormatter.format(date);
        const result = `${formattedDate} ${formattedTime}`;
        return result;
    } catch {
        return null;
    }
};
