import { getCollection } from 'astro:content';

interface ChangelogEntry {
  date: string;
  type: 'added' | 'updated' | 'fixed';
  description: string;
  contentType: 'device' | 'component' | 'project' | 'note';
  title: string;
  slug: string;
}

export async function getRecentChanges(limit = 10): Promise<ChangelogEntry[]> {
  const allChanges: ChangelogEntry[] = [];
  
  // Gather from devices collection
  const devices = await getCollection('devices');
  devices.forEach(item => {
    if (item.data.changelog) {
      item.data.changelog.forEach(change => {
        allChanges.push({
          ...change,
          contentType: 'device',
          title: item.data.title,
          slug: item.slug,
        });
      });
    }
  });
  
  // Gather from components collection
  const components = await getCollection('components');
  components.forEach(item => {
    if (item.data.changelog) {
      item.data.changelog.forEach(change => {
        allChanges.push({
          ...change,
          contentType: 'component',
          title: item.data.title,
          slug: item.slug,
        });
      });
    }
  });
  
  // Gather from projects collection
  const projects = await getCollection('projects');
  projects.forEach(item => {
    if (item.data.changelog) {
      item.data.changelog.forEach(change => {
        allChanges.push({
          ...change,
          contentType: 'project',
          title: item.data.title,
          slug: item.slug,
        });
      });
    }
  });
  
  // Gather from notes collection
  const notes = await getCollection('notes');
  notes.forEach(item => {
    if (item.data.changelog) {
      item.data.changelog.forEach(change => {
        allChanges.push({
          ...change,
          contentType: 'note',
          title: item.data.title,
          slug: item.slug,
        });
      });
    }
  });
  
  // Sort by date descending and limit results
  return allChanges
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function formatChangelogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

export function getChangeTypeEmoji(type: 'added' | 'updated' | 'fixed'): string {
  switch (type) {
    case 'added':
      return '✨';
    case 'updated':
      return '🔄';
    case 'fixed':
      return '🐛';
    default:
      return '📝';
  }
}
