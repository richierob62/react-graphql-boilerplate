import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const markdownDirectory = path.join(process.cwd(), 'markdown');

export function getMarkdownData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(markdownDirectory);

  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(markdownDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      content: matterResult.content,
    };
  });
}
