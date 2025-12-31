// supabase/resume.js
import { supabase } from "./client"; // make sure your supabase client is initialized

/**
 * Save or update a resume
 * @param {string} userId - Supabase user ID
 * @param {string} title - Resume title
 * @param {object} data - Resume JSON object
 * @param {string|null} resumeId - If updating existing resume, provide ID
 */
export async function saveResume(userId, title, data, resumeId = null) {
  if (!userId) throw new Error("User not logged in");

  if (resumeId) {
    // Update existing
    const { error } = await supabase
      .from("resumes")
      .update({ title, data })
      .eq("id", resumeId)
      .eq("user_id", userId);
    if (error) throw error;
    return { success: true };
  } else {
    // Insert new
    const { data: newData, error } = await supabase
      .from("resumes")
      .insert([{ user_id: userId, title, data }])
      .select();
    if (error) throw error;
    return newData[0];
  }
}

/**
 * Get all resumes for a user
 * @param {string} userId
 * @returns array of resumes
 */
export async function getResumes(userId) {
  if (!userId) throw new Error("User not logged in");
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return { data };
}

/**
 * Delete a resume
 * @param {string} userId
 * @param {string} resumeId
 */
export async function deleteResume(userId, resumeId) {
  if (!userId) throw new Error("User not logged in");
  const { error } = await supabase
    .from("resumes")
    .delete()
    .eq("id", resumeId)
    .eq("user_id", userId);
  if (error) throw error;
  return { success: true };
}
