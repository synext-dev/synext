// Phase 2: implement with Prisma
export async function enrollInCourse(
  userId: string,
  courseId: string
): Promise<{ success: boolean }> {
  // Mock: always succeed
  console.log(`Mock enrollment: user ${userId} -> course ${courseId}`);
  return { success: true };
}
