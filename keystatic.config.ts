// keystatic.config.ts (root level)
import { config, collection, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: 'heheeksdee0917/02dacpla', // ← change this
  },

  collections: {
    commercial: collection({
      label: 'Commercial Projects',
      slugField: 'slug',
      path: 'src/data/commercial/*',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Title' }),
        location: fields.text({ label: 'Location' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Commercial', value: 'Commercial' },
            { label: 'Residential', value: 'Residential' },
            { label: 'Hospitality', value: 'Hospitality' },
            { label: 'Interior', value: 'Interior' },
          ],
          defaultValue: 'Commercial',
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Completed', value: 'Completed' },
            { label: 'In Progress', value: 'In Progress' },
            { label: 'Upcoming', value: 'Upcoming' },
          ],
          defaultValue: 'Completed',
        }),
        projectTeam: fields.array(
          fields.text({ label: 'Member Name' }),
          { label: 'Project Team', itemLabel: (props) => props.value }
        ),
        accolades: fields.array(
          fields.text({ label: 'Accolade' }),
          { label: 'Accolades', itemLabel: (props) => props.value }
        ),
        images: fields.array(
          fields.image({
            label: 'Image',
            directory: 'public/Gallery/Commercial',
            publicPath: '/Gallery/Commercial/',
          }),
          { label: 'Images' }
        ),
        detailContent: fields.array(
          fields.object({
            type: fields.select({
              label: 'Type',
              options: [{ label: 'Text', value: 'text' }],
              defaultValue: 'text',
            }),
            content: fields.text({ label: 'Content', multiline: true }),
          }),
          { label: 'Detail Content', itemLabel: (props) => props.fields.type.value }
        ),
      },
    }),
  },
})