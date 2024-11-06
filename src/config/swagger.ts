import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
        .swagger-ui .topbar { 
            background-color: #2b3b45;
            display: flex; 
        }

        .topbar-wrapper {
            justify-content: center;
            align-items: center;
        }

        .topbar-wrapper .link {
            content: url('https://habid-badillo.vercel.app/favicon.svg');
            background-color: #F7F7F7;
            border-radius: 50%;
            height: 80px;
            width: auto;
        }
    `,
  customSiteTitle: "REST API Express / TypeScript Documentation",
  customfavIcon: "https://habid-badillo.vercel.app/favicon.svg",
};

export default swaggerSpec;

export { swaggerUiOptions };
