import { categoryApi, type Category } from "@/api/categories";
import { todoApi } from "@/api/todos";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createTodoSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().max(1000).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    categoryId: z.string().optional(),
    dueDate: z.date().optional(),
});

type CreateTodoFormValues = z.infer<typeof createTodoSchema>;

export function CreateTodoDialog() {
    const [open, setOpen] = useState(false);
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    // Fetch categories
    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const token = await getToken();
            if (!token) throw new Error("Unauthorized");
            return categoryApi.getAll(token);
        },
        enabled: open, // Only fetch when dialog is open
    });

    const categories = categoriesData?.data || [];

    const form = useForm<CreateTodoFormValues>({
        resolver: zodResolver(createTodoSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: CreateTodoFormValues) => {
            const token = await getToken();
            if (!token) throw new Error("Unauthorized");

            const payload = {
                ...values,
                dueDate: values.dueDate?.toISOString(),
            };

            return todoApi.create(token, payload);
        },
        onSuccess: () => {
            toast.success("Todo created successfully");
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            setOpen(false);
            form.reset();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create todo");
        },
    });

    function onSubmit(values: CreateTodoFormValues) {
        mutate(values);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ New Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] bg-background text-foreground border-border">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription className="screen-reader-only">
                        Add a new task.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Task Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Add a description..."
                                            className="resize-none h-24"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Priority</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="high">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                                        High
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="medium">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                                        Medium
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="low">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                                        Low
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="no-category">No Category</SelectItem>
                                                {categories.map((category: Category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Attachments Placeholder (Backend Integration TBD) */}
                        <div className="space-y-2">
                            <FormLabel>Attachments</FormLabel>
                            <div className="border border-dashed rounded-md p-4 flex items-center justify-center text-sm text-muted-foreground hover:bg-muted/50 transition cursor-not-allowed opacity-50">
                                <Upload className="mr-2 h-4 w-4" />
                                Add Files (Max 10MB per file) - Coming Soon
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating..." : "Create Task"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
