import { describe, it, expect } from 'vitest';
import { cn, slugify, generateRandomStars } from '../utils';

describe('Utils Functions', () => {
  describe('cn (className utility)', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional');
    });

    it('handles tailwind conflicts', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2');
    });
  });

  describe('slugify', () => {
    it('converts text to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('handles special characters', () => {
      expect(slugify('Hello & World!')).toBe('hello-and-world');
    });

    it('handles multiple spaces', () => {
      expect(slugify('Hello    World')).toBe('hello-world');
    });

    it('handles empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('handles numbers and letters', () => {
      expect(slugify('Project 123 Test')).toBe('project-123-test');
    });

    it('removes leading/trailing spaces', () => {
      expect(slugify('  Hello World  ')).toBe('hello-world');
    });
  });

  describe('generateRandomStars', () => {
    it('generates correct number of stars', () => {
      const stars = generateRandomStars(5, 100, 100, 1, 2);
      expect(stars).toHaveLength(5);
    });

    it('generates stars with points property', () => {
      const stars = generateRandomStars(1, 100, 100, 1, 2);
      expect(stars[0]).toHaveProperty('points');
      expect(typeof stars[0].points).toBe('string');
    });

    it('handles zero count', () => {
      const stars = generateRandomStars(0, 100, 100, 1, 2);
      expect(stars).toHaveLength(0);
    });

    it('generates different stars on multiple calls', () => {
      const stars1 = generateRandomStars(2, 100, 100, 1, 2);
      const stars2 = generateRandomStars(2, 100, 100, 1, 2);
      
      // Stars should be different due to randomness
      expect(stars1[0].points).not.toBe(stars2[0].points);
    });
  });
});