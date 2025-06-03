# Amenitiz Coding Challenge

## Sub-optimal Compromises

The following compromises were made to complete the task within the given constraints:

- **Local Component State**: Using React's useState for state management works for this scale, but wouldn't be optimal for larger applications where a more robust state management solution (Redux, Context API with reducers, Zustand, etc.) would be preferable.

- **No Data Caching**: The application has no caching strategy, potentially leading to redundant API calls when users navigate between pages or refresh.

- **Client-side Filtering**: Searching is implemented entirely on the client side, which doesn't scale well for large datasets. A server-side search implementation would be more efficient.

- **No Virtualization**: For long lists, the application doesn't implement virtualization, which could cause performance issues with large datasets.

These compromises were accepted to deliver a functioning application within the scope of the challenge, but would need to be addressed in a production environment.
