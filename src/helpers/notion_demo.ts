import { Client } from '@notionhq/client/build/src'
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID ?? ''

async function addItem (text: string): Promise<CreatePageResponse> {
  return await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      title: {
        title: [
          {
            text: {
              content: text
            }
          }
        ]
      }
    }
  })
}

export default addItem
