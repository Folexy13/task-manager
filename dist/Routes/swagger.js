"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = exports.swaggerDefinition = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "User Management API",
        version: "1.0.0",
        description: "API for managing users, including authentication, CRUD operations, and role management.",
    },
    servers: [
        {
            url: "http://localhost:8002", // Replace with your server URL
            description: "Development server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    paths: {
        "/api/v1/users": {
            post: {
                summary: "Register a new user",
                tags: ["Users"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", example: "user@example.com" },
                                    password: { type: "string", example: "password123" },
                                    full_name: { type: "string", example: "Fola Aluko" },
                                    phone: { type: "string", example: "234912669941" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "The created user",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        email: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad request",
                    },
                },
            },
            get: {
                summary: "Get all users",
                tags: ["Users"],
                responses: {
                    200: {
                        description: "List of all users",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer" },
                                            email: { type: "string" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                    },
                },
            },
        },
        "/api/v1/users/{id}": {
            get: {
                summary: "Get a specific user by ID",
                tags: ["Users"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "User ID",
                    },
                ],
                responses: {
                    200: {
                        description: "User details",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        email: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                    },
                },
            },
            put: {
                summary: "Update a user by ID",
                tags: ["Users"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "User ID",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", example: "updated@example.com" },
                                    password: { type: "string", example: "newpassword123" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Updated user details",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        email: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                    },
                },
            },
            delete: {
                summary: "Delete a user by ID",
                tags: ["Users"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "User ID",
                    },
                ],
                responses: {
                    204: {
                        description: "User deleted successfully",
                    },
                    404: {
                        description: "User not found",
                    },
                },
            },
        },
        "/api/v1/users/login": {
            post: {
                summary: "Login a user",
                tags: ["Users"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", example: "user@example.com" },
                                    password: { type: "string", example: "password123" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "JWT token",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Invalid credentials",
                    },
                },
            },
        },
        "/api/v1/profile": {
            get: {
                summary: "Get the current user's profile",
                tags: ["Users"],
                responses: {
                    200: {
                        description: "User profile details",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        email: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                    },
                },
            },
        },
        "/api/v1/roles": {
            // get: {
            //     summary: "Get all roles",
            //     tags: ["Roles"],
            //     responses: {
            //         200: {
            //             description: "List of roles",
            //             content: {
            //                 "application/json": {
            //                     schema: {
            //                         type: "array",
            //                         items: {
            //                             type: "object",
            //                             properties: {
            //                                 id: { type: "integer" },
            //                                 name: { type: "string" },
            //                             },
            //                         },
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // },
            post: {
                summary: "Create a new role",
                tags: ["Roles"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string", example: "Admin" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Role created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        name: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        // "/api/v1/roles/{id}": {
        //     delete: {
        //         summary: "Delete a role by ID",
        //         tags: ["Roles"],
        //         parameters: [
        //             {
        //                 name: "id",
        //                 in: "path",
        //                 required: true,
        //                 schema: { type: "integer" },
        //                 description: "Role ID",
        //             },
        //         ],
        //         responses: {
        //             204: {
        //                 description: "Role deleted successfully",
        //             },
        //             404: {
        //                 description: "Role not found",
        //             },
        //         },
        //     },
        // },
    },
};
exports.swaggerDefinition = swaggerDefinition;
// Swagger options
const options = {
    swaggerDefinition,
    apis: ["../Controllers/*.ts"],
};
// Generate Swagger spec
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
const swaggerOptions = {
    // definition: {
    //     openapi: "3.0.0",
    //     info: {
    //         title: "Task API",
    //         version: "1.0.0",
    //         description: "API for managing Tasks",
    //     },
    //     servers: [
    //         {
    //             url: "http://localhost:8082", // Replace with your server URL
    //         },
    //     ],
    // },
    definition: swaggerDefinition,
    apis: [], // No need for comments in controllers
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.swaggerDocs = swaggerDocs;
