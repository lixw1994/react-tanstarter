import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { $deleteUser } from "./-functions";

/**
 * Hook for deleting a user with optimistic updates
 */
export function useDeleteUserMutation() {
  const router = useRouter();
  const deleteUserFn = useServerFn($deleteUser);

  return useMutation({
    mutationFn: (userId: string) => deleteUserFn({ data: { userId } }),
    onSuccess: () => {
      toast.success("用户已删除");
      // Invalidate router to refetch loader data
      router.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "删除失败");
    },
  });
}
