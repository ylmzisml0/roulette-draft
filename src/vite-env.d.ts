/// <reference types="vite/client" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}

