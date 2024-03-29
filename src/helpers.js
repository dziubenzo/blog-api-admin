// Rich editor toolbar options
export const toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'link'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],

  [{ color: [] }],

  ['clean'],
];

// Get token from localStorage
export function getToken() {
  return localStorage.getItem('blogAPIToken');
}
