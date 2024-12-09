import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

  const themes = [{value: "default", label: "default"}];

  const statBlock = [];
  var characterSheet = {
    type: "boolean",
    name: "character_sheet",
    label: "Character Sheet",
    templates: false
  }


export default defineConfig({
  branch,

  // Get this from tina.io
  clientId:  process.env.TINA_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      mediaRoot: "/assets/image/",
      publicFolder: "./",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      // Characters
      {
        name: "characters",
        label: "Characters",
        path: "_characters",
        ui: {
          filename: {
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
        
                return `${(values?.title || "").trim().replace(/\W+/g, '-')}`.toLowerCase();
              
            },
          },
        },
        defaultItem: () => {
          return {
            layout: "character",
            theme: "default",
            type: "overview",
            public: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              component: ({ input }) => {
                return ("");
              },
            }
          },
          {
            type: "string",
            name: "excerpt", 
            label: "Caption",
          },
          {
            type: "string",
            name: "theme",
            label: "Page Theme",
            required: true,
            options: themes, 
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",

            isBody: true,
          },
          {
            type: "datetime", 
            name: "last_modified_at", 
            label: "Last Updated"
          },
          {
            type: "rich-text",
            name: "private_notes",
            label: "Private Notes",
          },
          {type: "string", name: "description", label: "Short Description"},
          {type: "reference", name: "species", label: "Species/Race", required: true, collections: ['species']},
          {type: "image", name: "item_image", label: "Image"},
          characterSheet,
          {type: "object", name: "details", label: "Details", fields: [
            {type: "string", name: "significant_events", label: "Significant Events", list: true},
            {type: "object", name: "core", label: "Core Details", fields: [
              {type: "number", name: "age", label: "Age"},
              {type: "string", name: "occupation", label: "Occupation", required: true},
              {type: "reference", name: "religion", label: "Religion", collections: ['religions']},
            ]}, 
            {type: "object", name: "appearance", label: "Appearance", fields: [
              {type: "string", name: "hair", label: "Hair Color", required: true},
              {type: "string", name: "eye", label: "Eye Color", required: true},
              {type: "string", name: "build", label: "Build", required: true},
              {type: "string", name: "height", label: "Height", required: true}, 
              {type: "string", name: "weight", label: "Weight", required: true}, 
              {type: "string", name: "distinguishing_features", label: "Distinguishing Features", list: true},
              {type: "string", name: "overview", label: "Overview", ui: {component: "textarea"}},
            ]}, 
            {type: "object", name: "personality", label: "Personality", fields: [
              {type: "string", name: "flaw", label: "Greatest Flaw"},
              {type: "string", name: "strenght", label: "Greatest Strength"},
              {type: "string", name: "fear", label: "Greatest Fear"},
              {type: "string", name: "ideal", label: "Ideal Life"},
              {type: "string", name: "power", label: "Thoughts on Power", ui: {component: "textarea"}},
              {type: "string", name: "ambition", label: "Thoughts on Ambition", ui: {component: "textarea"}},
              {type: "string", name: "love", label: "Thoughts on Love", ui: {component: "textarea"}},
              {type: "string", name: "change", label: "Thoughts on Change", ui: {component: "textarea"}},
              {type: "string", name: "motiviation", label: "Motivation", ui: {component: "textarea"}},
              {type: "string", name: "conflict", label: "Conflict", ui: {component: "textarea"}},
            ]}, 
            {type: "object", name: "ability", label: "Fighting Style", fields: [
              {type: "string", name: "notable_skills", label: "Notable Skills", list: true},
              {type: "string", name: "weapon", label: "Weapon(s) of Choice", required: true},
              {type: "string", name: "fighting_style", label: "Fighting Style", ui: {component: "textarea"}},
            ]}, 
            {type: "object", name: "relationships", label: "Relationsihps", list: true,
            ui: {
              itemProps: (item) => {
               if (item?.caption && item?.id) {
                    return { label: `${item?.id.split("/").pop().split(".")[0].replaceAll("-", " ")} (${item?.caption})` };
               }
                 
              return { label: "Unknown" };
                
              },
            }, 
            fields: [
              {type: "string", name: "caption", label: "Caption", required: true},
              {type: "boolean", name: "pin", label: "Pin to sidebar"}, 
              {type: "reference", name: "id", label: "Person", required: true, collections: ['characters']},
            ]}, 
            {type: "object", name: "connections", label: "Connections", list: true,
            ui: {
              itemProps: (item) => {
               if (item?.caption && item?.id) {
                    return { label: `${item?.id.split("/").pop().split(".")[0].replaceAll("-", " ")} (${item?.caption})` };
               }
                 
              return { label: "Unknown" };
                
              },
            }, 
            fields: [
              {type: "string", name: "caption", label: "Caption", required: true},
              {type: "reference", name: "id", label: "Connection", required: true, collections: ['organizations', 'locations', 'religions']},
            ]},
            {type: "object", name: "additional_images", label: "Images", list: true,
              ui: {
                itemProps: (item) => {
                 if (item?.caption) {
                      return { label: item?.caption };
                 }  
                return { label: "Unknown" };
                  
                },
              }, 
              fields: [
                {type: "string", name: "caption", label: "Caption", required: true},
                {type: "image", name: "image", label: "Image", required: true},
              ]
            },
          ] 
          },
          {
            type: "boolean",
            name: "public",
            label: "Show on Homepage / Character List"
          }
        ],
      },
      // Dieties 
      {
        name: "dieties",
        label: "Dieties",
        path: "_dieties",
        defaultItem: () => {
          return {
            layout: "diety",
            theme: "default",
            public: true
          }
        },
        ui: {
          filename: {
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
        
                return `${(values?.title || "").trim().replace(/\W+/g, '-')}`.toLowerCase();
              
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt", 
            label: "Short Description",
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            options: ["diety"], 
            ui: {
              component: ({ input }) => {
                return ("");
              },
            }
          },
          {
            type: "string",
            name: "theme",
            label: "Page Theme",
            required: true,
            options: themes, 
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {type: "image", name: "item_image", label: "Image"},
          {type: "object", name: "details", label: "Details", fields: [
            {type: "string", name: "type", label: "Type", required: true, options: ["celestial", "greater", "lesser", "matron", "patron"]},
          ] 
          },
          {
            type: "boolean",
            name: "public",
            label: "Show on Homepage / Diety List"
          },
          {
            type: "datetime", 
            name: "last_modified_at", 
            label: "Last Updated"
          }
        ],
      },
      // Religion 
      {
        name: "religions",
        label: "Religions",
        path: "_religions",
        defaultItem: () => {
          return {
            layout: "religion",
            theme: "default",
            public: true
          }
        },
        ui: {
          filename: {
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
        
                return `${(values?.title || "").trim().replace(/\W+/g, '-')}`.toLowerCase();
              
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt", 
            label: "Caption",
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            options: ["religion"], 
            ui: {
              component: ({ input }) => {
                return ("");
              },
            }
          },
          {
            type: "string",
            name: "theme",
            label: "Page Theme",
            required: true,
            options: themes, 
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {type: "image", name: "item_image", label: "Image"},
          {type: "object", name: "details", label: "Details", fields: [
            {type: "reference", name: "diety", label: "Diety", collections: ['dieties']},
            {type: "reference", name: "head", label: "Head", collections: ['characters']},
            {type: "reference", name: "headquarters", label: "Headquarters", collections: ['locations']},
          ] 
          },
          {
            type: "datetime", 
            name: "last_modified_at", 
            label: "Last Updated"
          },
          {
            type: "boolean",
            name: "public",
            label: "Show on Homepage / Religion List"
          }
        ],
      },
      // Locations
      {
        name: "locations",
        label: "Locations",
        path: "_locations",
        defaultItem: () => {
          return {
            layout: "location",
            theme: "default",
            type: "overview",
            public: true

          }
        },
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
         
                return `${(values?.parent || "")
                .replace('.md', '')
                .replace('_locations/', '/')}/${(values?.title || "").trim().replace(/\W+/g, '-')
              }`.toLowerCase();
              
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt", 
            label: "Caption",
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              component: ({ input }) => {
                return ("");
              },
            },
          },
          {
            type: "string",
            name: "theme",
            label: "Page Theme",
            required: true,
            options: themes, 
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {type: "image", name: "item_image", label: "Image"},
          {
            type: "boolean",
            name: "public",
            label: "Show on Homepage"
          },
          {type: "object", name: "details", label: "Details", fields: [
            {type: "string", name: "type", label: "Type", required: true, options: ["nation", "region", "city", "city district", "town", "village", "landmark", "building", "other"]},
            {type: "object", name: "connections", label: "Connections", list: true,
            ui: {
              itemProps: (item) => {
               if (item?.caption && item?.id) {
                    return { label: `${item?.id.split("/").pop().split(".")[0].replaceAll("-", " ")} (${item?.caption})` };
               }
                 
              return { label: "Unknown" };
                
              },
            }, 
            fields: [
              {type: "string", name: "caption", label: "Caption", required: true},
              {type: "string", name: "type", label: "Type", required: true, options: ["member"]},
              {type: "reference", name: "id", label: "Organization", required: true, collections: ['organizations']},
            ]},
          ] 
          },
          {type: "reference", name: "parent", label: "parent", collections: ["locations"]},
          {
            type: "datetime", 
            name: "last_modified_at", 
            label: "Last Updated"
          }
        ],
      },
      // Stories
      {
        name: "stories",
        label: "Stories",
        path: "_stories",
        defaultItem: () => {
          return {
            layout: "story",
            theme: "default", 
            public: true

          }
        },
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
              return `${(values?.title || "").replace(/\W+/g, '-')}`.toLowerCase();
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              component: ({ input }) => {
                return ("");
              },
            },
          },
          {
            type: "string",
            name: "theme",
            label: "Page Theme",
            required: true,
            options: themes, 
          },
          {
            type: "string",
            name: "excerpt", 
            label: "Caption",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "datetime", 
            name: "last_modified_at", 
            label: "Last Updated"
          },
          {
            type: "boolean",
            name: "published",
            label: "Published"
          },
          {
            type: "boolean",
            name: "public",
            label: "Show on Homepage"
          },
          {type: "image", name: "item_image", label: "Image"},
          {type: "object", name: "details", label: "Details", fields: [
            {type: "object", name: "characters", label: "Main Characters", list: true,
              ui: {
                itemProps: (item) => {
                 if (item?.id) {
                      return { label: `${item?.id.split("/").pop().split(".")[0].replaceAll("-", " ")}` };
                 }
                   
                return { label: "Unknown" };
                  
                },
              }, 
              fields: [              
                {type: "reference", name: "id", label: "Person", required: true, collections: ['characters']},
              ]}, 
          ]}
        ],
      },
      // Chapters
      {
        name: "chapters",
        label: "Chapters",
        path: "_chapters",
        defaultItem: () => {
          return {
            layout: "chapter",
            theme: "default",
            public: true
          }
        },
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => {
              if (values?.story) {
                return `chapter-${("00" + (values?.chapter || 1)).slice(-3)}-${values?.story.split("/").pop().split(".")[0]}-${(values?.title || "").trim().replace(/\W+/g, '-')
                }`.toLowerCase();
              }
              else{
                return `${(values?.title || "").trim().replace(/\W+/g, '-')}`.toLowerCase();
              }
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}

            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },

          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              component: ({ input }) => {
                return ("");
              },
            },
          },
          {
            type: "string",
            name: "theme",
            label: "Page Theme",
            required: true,
            options: themes, 
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          }, 
          {
            type: "reference", 
            name: "story",
            label: "Story",
            collections: ["stories"]
          }, 
          {
            type: "number",
            label: "Chapter Number",
            name: "chapter_number",
          }, 
          {
            type: "string", 
            label: "Short Story Exerpt", 
            name: "excerpt",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime", 
            name: "last_modified_at", 
            label: "Last Updated"
          },
          {
            type: "boolean",
            name: "published",
            label: "Published"
          },
          {
            type: "boolean",
            name: "public",
            label: "Show on Homepage"
          },
          {type: "image", name: "item_image", label: "Image"},
          {type: "object", name: "details", label: "Details", fields: [
            {type: "object", name: "characters", label: "Significant Characters", list: true,
              ui: {
                itemProps: (item) => {
                 if (item?.caption && item?.id) {
                      return { label: `${item?.id.split("/").pop().split(".")[0].replaceAll("-", " ")} (${item?.caption})` };
                 }
                 if (item?.id) {
                      return { label: `${item?.id.split("/").pop().split(".")[0].replaceAll("-", " ")}` };
                 }
                   
                return { label: "Unknown" };
                  
                },
              }, 
              fields: [{
                    type: "string", 
                    label: "Description", 
                    name: "description",
                    ui: {
                      component: "textarea"
                    }
                  },
                {type: "reference", name: "id", label: "Person", required: true, collections: ['characters']},
              ]}, 
              {type: "object", name: "locations", label: "Significant Locations", list: true,
                ui: {
                  itemProps: (item) => {
                   if (item?.id) {
                        return { label: `${item?.id.split("/").pop().split(".")[0].replaceAll("-", " ")}` };
                   }
                     
                  return { label: "Unknown" };
                    
                  },
                }, 
                fields: [
                  {
                    type: "string", 
                    label: "Description", 
                    name: "description",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {type: "reference", name: "id", label: "Location", required: true, collections: ['locations']},
                ]}
          ] 
          },
        ],
      },
      // Organizations

      {
        name: "organizations",
        label: "Organization",
        path: "_organizations",
        ui: {
          filename: {
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}

                return `${(values?.location || "").replace('.md', '').replace('_locations/', '/')}/${
                  (values?.title || "").trim().replace(/\W+/g, '-')
                }`.toLowerCase();
              
            },
          },
        },
        defaultItem: () => {
          return {
            layout: "organization",
            theme: "default",
            public: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              component: ({ input }) => {
                return ("");
              },
            }
          },
          {
            type: "string",
            name: "theme",
            label: "Page Theme",
            required: true,
            options: themes, 
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",

            isBody: true,
          },
          {
            type: "datetime", 
            name: "last_modified_at", 
            label: "Last Updated"
          },
          {
            type: "boolean",
            name: "public",
            label: "Show on Homepage / Organizatio List"
          },
          {type: "string", name: "caption", label: "Caption"},
          {type: "image", name: "item_image", label: "Image"},
          {type: "reference", name: "location", label: "Location", collections: ['locations']},
          
          {type: "object", name: "members", label: "Members", list: true, 
            ui: {
              itemProps: (item) => {
               if (item?.caption && item?.id) {
                    return { label: `${item?.id.split("/").pop().split(".")[0].replaceAll("-", " ")} (${item?.caption})` };
               }
                
              },
            }, 
            fields: [
            {type: "string", name: "caption", label: "Caption", required: true},
            {type: "reference", name: "id", label: "Character", collections: ['characters']},
          ] 
          },
          {type: "object", name: "details", label: "Details", fields: [
            {type: "string", name: "type", label: "Type", required: true, options: ["buisness", "religious", "government", "other"]},
          ] 
          },
        ]
      },
      // Species

      {
        name: "species",
        label: "Species",
        path: "_species",
        ui: {
          filename: {
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
        
                return `${(values?.title || "").trim().replace(/\W+/g, '-')}`.toLowerCase();
              
            },
          },
        },
        defaultItem: () => {
          return {
            layout: "species",
            theme: "default",
            type: "overview",
            public: false
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              component: ({ input }) => {
                return ("");
              },
            }
          },
          {
            type: "string",
            name: "theme",
            label: "Theme",
            required: true,
            ui: {
              component: ({ input }) => {
                return ("");
              },
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",

            isBody: true,
          },
          {type: "image", name: "item_image", label: "Image"}
        ]
      }
    ],
  },
});
