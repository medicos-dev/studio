'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating abstract, artistic placeholder images for the gallery section of the Asterasia café website.
 *
 * - generateGalleryImages - A function that generates abstract placeholder images.
 * - GenerateGalleryImagesInput - The input type for the generateGalleryImages function.
 * - GenerateGalleryImagesOutput - The return type for the generateGalleryImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGalleryImagesInputSchema = z.object({
  imageDescription: z
    .string()
    .describe(
      'A description of the desired aesthetic for the generated images.  Examples:  abstract, artistic, modern café, warm colors, cool colors, etc.'
    ),
  numberOfImages: z
    .number()
    .default(6)
    .describe('The number of placeholder images to generate.'),
});
export type GenerateGalleryImagesInput = z.infer<typeof GenerateGalleryImagesInputSchema>;

const GenerateGalleryImagesOutputSchema = z.object({
  images: z.array(z.string()).describe('An array of base64 encoded image data URIs.'),
});
export type GenerateGalleryImagesOutput = z.infer<typeof GenerateGalleryImagesOutputSchema>;

export async function generateGalleryImages(
  input: GenerateGalleryImagesInput
): Promise<GenerateGalleryImagesOutput> {
  return generateGalleryImagesFlow(input);
}

const generateGalleryImagesFlow = ai.defineFlow(
  {
    name: 'generateGalleryImagesFlow',
    inputSchema: GenerateGalleryImagesInputSchema,
    outputSchema: GenerateGalleryImagesOutputSchema,
  },
  async input => {
    const {imageDescription, numberOfImages} = input;
    const images: string[] = [];

    for (let i = 0; i < numberOfImages; i++) {
      const {media} = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Generate an abstract, artistic placeholder image for the gallery section of a modern café website. The image should be visually appealing and match the following description: ${imageDescription}. The image should use organic blobs, fluid curves and pebble-like shapes, soft waves and asymmetrical layouts.`,
      });
      if (media && media.url) {
        images.push(media.url);
      }
    }

    return {images};
  }
);
