export const invalidatesTags = (reducerPath: string, tags: string[] = []): string[] => {
  fetch('/api/ws/invalidate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reducerPath, tags })
  }).catch(console.error)

  return tags
}
