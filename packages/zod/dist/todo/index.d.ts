import z from "zod";
export declare const ZTodoStatus: z.ZodEnum<["draft", "active", "completed", "archived"]>;
export declare const ZTodoPriority: z.ZodEnum<["low", "medium", "high"]>;
export declare const ZTodoMetadata: z.ZodObject<{
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    reminder: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    color?: string | undefined;
    tags?: string[] | undefined;
    reminder?: string | undefined;
    difficulty?: number | undefined;
}, {
    color?: string | undefined;
    tags?: string[] | undefined;
    reminder?: string | undefined;
    difficulty?: number | undefined;
}>;
export declare const ZTodo: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["draft", "active", "completed", "archived"]>;
    priority: z.ZodEnum<["low", "medium", "high"]>;
    dueDate: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    parentTodoId: z.ZodNullable<z.ZodString>;
    categoryId: z.ZodNullable<z.ZodString>;
    metadata: z.ZodNullable<z.ZodObject<{
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        reminder: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        difficulty: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        color?: string | undefined;
        tags?: string[] | undefined;
        reminder?: string | undefined;
        difficulty?: number | undefined;
    }, {
        color?: string | undefined;
        tags?: string[] | undefined;
        reminder?: string | undefined;
        difficulty?: number | undefined;
    }>>;
    sortOrder: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "active" | "completed" | "archived";
    title: string;
    priority: "low" | "medium" | "high";
    dueDate: string | null;
    completedAt: string | null;
    parentTodoId: string | null;
    categoryId: string | null;
    metadata: {
        color?: string | undefined;
        tags?: string[] | undefined;
        reminder?: string | undefined;
        difficulty?: number | undefined;
    } | null;
    sortOrder: number;
}, {
    id: string;
    userId: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "active" | "completed" | "archived";
    title: string;
    priority: "low" | "medium" | "high";
    dueDate: string | null;
    completedAt: string | null;
    parentTodoId: string | null;
    categoryId: string | null;
    metadata: {
        color?: string | undefined;
        tags?: string[] | undefined;
        reminder?: string | undefined;
        difficulty?: number | undefined;
    } | null;
    sortOrder: number;
}>;
export declare const ZTodoAttachment: z.ZodObject<{
    id: z.ZodString;
    todoId: z.ZodString;
    name: z.ZodString;
    uploadedBy: z.ZodString;
    downloadKey: z.ZodString;
    fileSize: z.ZodNullable<z.ZodNumber>;
    mimeType: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    todoId: string;
    uploadedBy: string;
    downloadKey: string;
    fileSize: number | null;
    mimeType: string | null;
}, {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    todoId: string;
    uploadedBy: string;
    downloadKey: string;
    fileSize: number | null;
    mimeType: string | null;
}>;
export declare const ZPopulatedTodo: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["draft", "active", "completed", "archived"]>;
    priority: z.ZodEnum<["low", "medium", "high"]>;
    dueDate: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    parentTodoId: z.ZodNullable<z.ZodString>;
    categoryId: z.ZodNullable<z.ZodString>;
    metadata: z.ZodNullable<z.ZodObject<{
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        reminder: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        difficulty: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        color?: string | undefined;
        tags?: string[] | undefined;
        reminder?: string | undefined;
        difficulty?: number | undefined;
    }, {
        color?: string | undefined;
        tags?: string[] | undefined;
        reminder?: string | undefined;
        difficulty?: number | undefined;
    }>>;
    sortOrder: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    category: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        name: z.ZodString;
        color: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        userId: string;
        name: string;
        color: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
    }, {
        id: string;
        userId: string;
        name: string;
        color: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
    }>>;
    children: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        title: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<["draft", "active", "completed", "archived"]>;
        priority: z.ZodEnum<["low", "medium", "high"]>;
        dueDate: z.ZodNullable<z.ZodString>;
        completedAt: z.ZodNullable<z.ZodString>;
        parentTodoId: z.ZodNullable<z.ZodString>;
        categoryId: z.ZodNullable<z.ZodString>;
        metadata: z.ZodNullable<z.ZodObject<{
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reminder: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            difficulty: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            color?: string | undefined;
            tags?: string[] | undefined;
            reminder?: string | undefined;
            difficulty?: number | undefined;
        }, {
            color?: string | undefined;
            tags?: string[] | undefined;
            reminder?: string | undefined;
            difficulty?: number | undefined;
        }>>;
        sortOrder: z.ZodNumber;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        userId: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "active" | "completed" | "archived";
        title: string;
        priority: "low" | "medium" | "high";
        dueDate: string | null;
        completedAt: string | null;
        parentTodoId: string | null;
        categoryId: string | null;
        metadata: {
            color?: string | undefined;
            tags?: string[] | undefined;
            reminder?: string | undefined;
            difficulty?: number | undefined;
        } | null;
        sortOrder: number;
    }, {
        id: string;
        userId: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "active" | "completed" | "archived";
        title: string;
        priority: "low" | "medium" | "high";
        dueDate: string | null;
        completedAt: string | null;
        parentTodoId: string | null;
        categoryId: string | null;
        metadata: {
            color?: string | undefined;
            tags?: string[] | undefined;
            reminder?: string | undefined;
            difficulty?: number | undefined;
        } | null;
        sortOrder: number;
    }>, "many">;
    comments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        todoId: z.ZodString;
        userId: z.ZodString;
        content: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
        todoId: string;
        content: string;
    }, {
        id: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
        todoId: string;
        content: string;
    }>, "many">;
    attachments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        todoId: z.ZodString;
        name: z.ZodString;
        uploadedBy: z.ZodString;
        downloadKey: z.ZodString;
        fileSize: z.ZodNullable<z.ZodNumber>;
        mimeType: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        todoId: string;
        uploadedBy: string;
        downloadKey: string;
        fileSize: number | null;
        mimeType: string | null;
    }, {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        todoId: string;
        uploadedBy: string;
        downloadKey: string;
        fileSize: number | null;
        mimeType: string | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "active" | "completed" | "archived";
    title: string;
    priority: "low" | "medium" | "high";
    dueDate: string | null;
    completedAt: string | null;
    parentTodoId: string | null;
    categoryId: string | null;
    metadata: {
        color?: string | undefined;
        tags?: string[] | undefined;
        reminder?: string | undefined;
        difficulty?: number | undefined;
    } | null;
    sortOrder: number;
    category: {
        id: string;
        userId: string;
        name: string;
        color: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
    } | null;
    children: {
        id: string;
        userId: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "active" | "completed" | "archived";
        title: string;
        priority: "low" | "medium" | "high";
        dueDate: string | null;
        completedAt: string | null;
        parentTodoId: string | null;
        categoryId: string | null;
        metadata: {
            color?: string | undefined;
            tags?: string[] | undefined;
            reminder?: string | undefined;
            difficulty?: number | undefined;
        } | null;
        sortOrder: number;
    }[];
    comments: {
        id: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
        todoId: string;
        content: string;
    }[];
    attachments: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        todoId: string;
        uploadedBy: string;
        downloadKey: string;
        fileSize: number | null;
        mimeType: string | null;
    }[];
}, {
    id: string;
    userId: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "active" | "completed" | "archived";
    title: string;
    priority: "low" | "medium" | "high";
    dueDate: string | null;
    completedAt: string | null;
    parentTodoId: string | null;
    categoryId: string | null;
    metadata: {
        color?: string | undefined;
        tags?: string[] | undefined;
        reminder?: string | undefined;
        difficulty?: number | undefined;
    } | null;
    sortOrder: number;
    category: {
        id: string;
        userId: string;
        name: string;
        color: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
    } | null;
    children: {
        id: string;
        userId: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "active" | "completed" | "archived";
        title: string;
        priority: "low" | "medium" | "high";
        dueDate: string | null;
        completedAt: string | null;
        parentTodoId: string | null;
        categoryId: string | null;
        metadata: {
            color?: string | undefined;
            tags?: string[] | undefined;
            reminder?: string | undefined;
            difficulty?: number | undefined;
        } | null;
        sortOrder: number;
    }[];
    comments: {
        id: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
        todoId: string;
        content: string;
    }[];
    attachments: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        todoId: string;
        uploadedBy: string;
        downloadKey: string;
        fileSize: number | null;
        mimeType: string | null;
    }[];
}>;
export declare const ZTodoStats: z.ZodObject<{
    total: z.ZodNumber;
    draft: z.ZodNumber;
    active: z.ZodNumber;
    completed: z.ZodNumber;
    archived: z.ZodNumber;
    overdue: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    draft: number;
    active: number;
    completed: number;
    archived: number;
    total: number;
    overdue: number;
}, {
    draft: number;
    active: number;
    completed: number;
    archived: number;
    total: number;
    overdue: number;
}>;
//# sourceMappingURL=index.d.ts.map