import { useDeleteCategory, useGetAllCategories } from "@/api/hooks/use-category-query";
import { CategoryCreateForm } from "@/components/categories/category-create-form";
import { CategoryEditForm } from "@/components/categories/category-edit-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CategoriesPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: categories, isLoading } = useGetAllCategories({
    query: { page: 1, limit: 100 },
  });

  const deleteCategory = useDeleteCategory();

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteCategory.mutateAsync({ categoryId: deleteId });
      toast.success("Category deleted successfully");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage your task categories
          </p>
        </div>
        <CategoryCreateForm>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </CategoryCreateForm>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : categories?.data && categories.data.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.data.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {category.name}
                </CardTitle>
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4 min-h-[1.5rem] line-clamp-2">
                  {category.description || "No description"}
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-background">
                    {category.color}
                  </Badge>
                  <div className="flex gap-2">
                    <CategoryEditForm category={category}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CategoryEditForm>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-medium mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-4">
              Create your first category to organize your tasks.
            </p>
            <CategoryCreateForm>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Button>
            </CategoryCreateForm>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category
              and remove it from any associated tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteCategory.isPending}
            >
              {deleteCategory.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
