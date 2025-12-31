import { supabase } from "./client";

// Save a resume (new or update)
export async function saveResume(user_id, title, data, id = null) {
  if (id) {
    const { error } = await supabase
      .from("resumes")
      .update({ title, data })
      .eq("id", id);
    return { error };
  } else {
    const { error } = await supabase
      .from("resumes")
      .insert([{ user_id, title, data }]);
    return { error };
  }
}

// Get all resumes of user
export async function getResumes(user_id) {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
  return { data, error };
}

// Delete resume
export async function deleteResume(id) {
  const { error } = await supabase.from("resumes").delete().eq("id", id);
  return { error };
}
