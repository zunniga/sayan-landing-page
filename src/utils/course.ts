import { CourseTopic } from '../types/course';

/**
 * 
 * @param topics - Array de strings JSON que representan los temas y subtemas de un curso
 * @returns Array de objetos CourseTopic con los temas y subtemas parseados
 */
export function parseTopics(topics: string[]): CourseTopic[] {
  return topics.map(topicStr => {
    try {
      return JSON.parse(topicStr) as CourseTopic;
    } catch (error) {
      console.error('Error parsing topic:', topicStr, error);
      return { tema: topicStr, subTema: [] };
    }
  });
}