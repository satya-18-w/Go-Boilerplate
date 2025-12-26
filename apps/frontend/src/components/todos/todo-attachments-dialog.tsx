import { type ReactNode, useRef } from "react";
import { useGetTodoById } from "@/api/hooks/use-todo-query";
import { useUploadTodoAttachment } from "@/api/hooks/use-todo-attachment-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";
import { Paperclip, Upload } from "lucide-react";
import { toast } from "sonner";
import { TodoAttachments } from "./todo-attachments";

interface TodoAttachmentsDialogProps {
    todoId: string;
    children: ReactNode;
}

export function TodoAttachmentsDialog({ todoId, children }: TodoAttachmentsDialogProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: todo, isLoading } = useGetTodoById({ id: todoId });
    const uploadAttachment = useUploadTodoAttachment();

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) return;

        for (const file of files) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error(`File ${file.name} is too large (max 10MB)`);
                continue;
            }

            try {
                await uploadAttachment.mutateAsync({ todoId, file });
                toast.success(`Uploaded ${file.name} successfully`);
            } catch {
                // Error handling is done in the hook's onError
            }
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[60vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Paperclip className="h-5 w-5" />
                        Attachments ({todo?.attachments?.length || 0})
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 flex flex-col min-h-0 space-y-4">
                    <div className="flex-1 overflow-y-auto pr-2">
                        {isLoading ? (
                            <div className="space-y-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                        ) : todo?.attachments && todo.attachments.length > 0 ? (
                            <TodoAttachments
                                todoId={todoId}
                                attachments={todo.attachments}
                            />
                        ) : (
                            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                <Paperclip className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>No attachments yet.</p>
                                <p className="text-xs">Upload files to keep them handy.</p>
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                            disabled={uploadAttachment.isPending}
                        />
                        <Button
                            className="w-full"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadAttachment.isPending}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            {uploadAttachment.isPending ? "Uploading..." : "Upload New Attachment"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-2">
                            Max 10MB per file
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
