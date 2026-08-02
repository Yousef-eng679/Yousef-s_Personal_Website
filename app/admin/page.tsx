'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Shield, GripVertical, Star, Edit, Trash2, Plus, Loader2, CheckCircle2, AlertCircle, X, LogOut, Upload, BookOpen, FileEdit } from 'lucide-react';
import type { Project, ProjectFormData, Profile, Article, ArticleFormData, AboutSection, AboutSectionFormData } from '@/types/database';

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  // State
  const [activeTab, setActiveTab] = useState<'projects' | 'articles' | 'about' | 'profile'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  
  // Toast state
  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form state for projects
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: 'project',
    icon_emoji: '',
    icon_color: 'purple',
    tech_stack: [],
    image_url: '',
    video_url: '',
    github_url: '',
    live_url: '',
    is_featured: false,
    sort_order: 0,
    long_description: '',
    content: '',
    gallery_urls: [],
  });
  const [techStackInput, setTechStackInput] = useState('');

  // Form state for articles
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleForm, setArticleForm] = useState<ArticleFormData>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover_image_url: '',
    read_time: 5,
    is_published: false,
  });

  // Form state for about sections
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [editingAboutSection, setEditingAboutSection] = useState<AboutSection | null>(null);
  const [aboutForm, setAboutForm] = useState<AboutSectionFormData>({
    title: '',
    content: '',
    image_url: '',
    sort_order: 0,
  });

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order');
      if (projectsError) throw projectsError;
      if (projectsData) setProjects(projectsData);

      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .single();
      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      if (profileData) setProfile(profileData);

      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (articlesError) throw articlesError;
      if (articlesData) setArticles(articlesData);

      const { data: aboutData, error: aboutError } = await supabase
        .from('about_sections')
        .select('*')
        .order('sort_order');
      if (aboutError) throw aboutError;
      if (aboutData) setAboutSections(aboutData);

    } catch (err: any) {
      showToast(err.message || 'Error fetching data', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  // Drag and drop for projects
  const onDragEndProjects = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately
    const updatedItems = items.map((item, index) => ({ ...item, sort_order: index }));
    setProjects(updatedItems);

    // Batch update to Supabase
    try {
      const updates = updatedItems.map((item) => ({
        id: item.id,
        sort_order: item.sort_order,
      }));

      const { error } = await supabase.from('projects').upsert(updates);
      if (error) throw error;
      
      showToast('Project order updated', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error updating order', 'error');
      fetchData(); // Revert
    }
  };

  // Drag and drop for about sections
  const onDragEndAbout = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(aboutSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately
    const updatedItems = items.map((item, index) => ({ ...item, sort_order: index }));
    setAboutSections(updatedItems);

    // Batch update to Supabase
    try {
      const updates = updatedItems.map((item) => ({
        id: item.id,
        sort_order: item.sort_order,
      }));

      const { error } = await supabase.from('about_sections').upsert(updates);
      if (error) throw error;
      
      showToast('About section order updated', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error updating order', 'error');
      fetchData(); // Revert
    }
  };

  // File Upload Helper
  const handleFileUpload = async (file: File, bucketPath: string): Promise<string> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
    const filePath = `${bucketPath}${fileName}`;

    setUploadProgress(`Uploading ${file.name}...`);
    
    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(filePath);

    setUploadProgress('');
    return data.publicUrl;
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (file.type !== 'video/mp4' && file.type !== 'video/webm') {
      showToast('Video must be mp4 or webm', 'error');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      showToast('Video size must be less than 50MB', 'error');
      return;
    }

    try {
      const url = await handleFileUpload(file, 'videos/');
      setFormData(prev => ({ ...prev, video_url: url }));
      showToast('Video uploaded successfully', 'success');
    } catch (err: any) {
      setUploadProgress('');
      showToast(err.message || 'Error uploading video', 'error');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await handleFileUpload(file, 'images/');
      setFormData(prev => ({ ...prev, image_url: url }));
      showToast('Image uploaded successfully', 'success');
    } catch (err: any) {
      setUploadProgress('');
      showToast(err.message || 'Error uploading image', 'error');
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await handleFileUpload(file, 'images/');
      setFormData(prev => ({ ...prev, gallery_urls: [...(prev.gallery_urls || []), url] }));
      showToast('Gallery image uploaded successfully', 'success');
    } catch (err: any) {
      setUploadProgress('');
      showToast(err.message || 'Error uploading gallery image', 'error');
    }
  };
  
  const removeGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_urls: (prev.gallery_urls || []).filter((_, i) => i !== indexToRemove)
    }));
  };

  const openProjectModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category as any,
        icon_emoji: project.icon_emoji,
        icon_color: project.icon_color,
        tech_stack: project.tech_stack || [],
        image_url: project.image_url || '',
        video_url: project.video_url || '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        is_featured: project.is_featured,
        sort_order: project.sort_order,
        long_description: project.long_description || '',
        content: project.content || '',
        gallery_urls: project.gallery_urls || [],
      });
      setTechStackInput(project.tech_stack?.join(', ') || '');
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        category: 'project',
        icon_emoji: '',
        icon_color: 'purple',
        tech_stack: [],
        image_url: '',
        video_url: '',
        github_url: '',
        live_url: '',
        is_featured: false,
        sort_order: projects.length,
        long_description: '',
        content: '',
        gallery_urls: [],
      });
      setTechStackInput('');
    }
    setIsModalOpen(true);
  };

  const saveProject = async () => {
    if (!formData.title || !formData.description) {
      showToast('Title and Description are required', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const tech_stack = techStackInput.split(',').map(s => s.trim()).filter(Boolean);
      const payload = { ...formData, tech_stack };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingProject.id);
        if (error) throw error;
        showToast('Project updated', 'success');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([payload]);
        if (error) throw error;
        showToast('Project created', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error saving project', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      showToast('Project deleted', 'success');
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error deleting project', 'error');
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_featured: !project.is_featured })
        .eq('id', project.id);
      if (error) throw error;
      showToast(`Project ${project.is_featured ? 'unfeatured' : 'featured'}`, 'success');
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error updating project', 'error');
    }
  };

  // Profile Save
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSubmitting(true);
    try {
      const { id, ...updateData } = profile;
      const { error } = await supabase
        .from('profile')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
      showToast('Profile updated successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error updating profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    try {
      const url = await handleFileUpload(file, 'cv/');
      setProfile({ ...profile, cv_url: url });
      showToast('CV uploaded successfully (save profile to persist)', 'success');
    } catch (err: any) {
      setUploadProgress('');
      showToast(err.message || 'Error uploading CV', 'error');
    }
  };

  // Article handlers
  const openArticleModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setArticleForm({
        title: article.title,
        slug: article.slug,
        summary: article.summary || '',
        content: article.content || '',
        cover_image_url: article.cover_image_url || '',
        read_time: article.read_time || 5,
        is_published: article.is_published || false,
      });
    } else {
      setEditingArticle(null);
      setArticleForm({
        title: '',
        slug: '',
        summary: '',
        content: '',
        cover_image_url: '',
        read_time: 5,
        is_published: false,
      });
    }
    setIsArticleModalOpen(true);
  };

  const handleArticleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setArticleForm(prev => {
      // Auto-generate slug if not editing or if we want it to stay in sync
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return { ...prev, title, slug };
    });
  };

  const handleArticleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await handleFileUpload(file, 'images/');
      setArticleForm(prev => ({ ...prev, cover_image_url: url }));
      showToast('Cover image uploaded', 'success');
    } catch (err: any) {
      setUploadProgress('');
      showToast(err.message || 'Error uploading cover', 'error');
    }
  };

  const saveArticle = async () => {
    if (!articleForm.title || !articleForm.slug) {
      showToast('Title and Slug are required', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingArticle) {
        const { error } = await supabase
          .from('articles')
          .update(articleForm)
          .eq('id', editingArticle.id);
        if (error) throw error;
        showToast('Article updated', 'success');
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleForm]);
        if (error) throw error;
        showToast('Article created', 'success');
      }
      setIsArticleModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error saving article', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      showToast('Article deleted', 'success');
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error deleting article', 'error');
    }
  };

  const toggleArticlePublish = async (article: Article) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ is_published: !article.is_published })
        .eq('id', article.id);
      if (error) throw error;
      showToast(`Article ${!article.is_published ? 'published' : 'unpublished'}`, 'success');
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error updating article', 'error');
    }
  };

  // About Section handlers
  const openAboutModal = (section?: AboutSection) => {
    if (section) {
      setEditingAboutSection(section);
      setAboutForm({
        title: section.title,
        content: section.content || '',
        image_url: section.image_url || '',
        sort_order: section.sort_order,
      });
    } else {
      setEditingAboutSection(null);
      setAboutForm({
        title: '',
        content: '',
        image_url: '',
        sort_order: aboutSections.length,
      });
    }
    setIsAboutModalOpen(true);
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await handleFileUpload(file, 'images/');
      setAboutForm(prev => ({ ...prev, image_url: url }));
      showToast('Image uploaded', 'success');
    } catch (err: any) {
      setUploadProgress('');
      showToast(err.message || 'Error uploading image', 'error');
    }
  };

  const saveAboutSection = async () => {
    if (!aboutForm.title) {
      showToast('Title is required', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingAboutSection) {
        const { error } = await supabase
          .from('about_sections')
          .update(aboutForm)
          .eq('id', editingAboutSection.id);
        if (error) throw error;
        showToast('Section updated', 'success');
      } else {
        const { error } = await supabase
          .from('about_sections')
          .insert([aboutForm]);
        if (error) throw error;
        showToast('Section created', 'success');
      }
      setIsAboutModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error saving section', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAboutSection = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;
    try {
      const { error } = await supabase.from('about_sections').delete().eq('id', id);
      if (error) throw error;
      showToast('Section deleted', 'success');
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error deleting section', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-surface text-slate-200">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface-low sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-purple/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <h1 className="font-bold text-white leading-tight">Admin Control Center</h1>
              <p className="text-xs text-slate-400">{projects.length} Projects</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Tabs */}
        <div className="flex space-x-2 mb-8 bg-surface-low p-1.5 rounded-xl border border-white/5 w-fit">
          {['projects', 'articles', 'about', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`sidebar-link capitalize px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-white/10 text-white shadow-sm sidebar-link active' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
              <button
                onClick={() => openProjectModal()}
                className="flex items-center gap-2 bg-accent-purple hover:bg-accent-purple/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            <DragDropContext onDragEnd={onDragEndProjects}>
              <Droppable droppableId="projects-list">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {projects.map((project, index) => (
                      <Draggable key={project.id} draggableId={project.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                              snapshot.isDragging 
                                ? 'bg-surface border-accent-purple/50 shadow-xl shadow-accent-purple/10 scale-[1.02]' 
                                : 'bg-surface-low border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div {...provided.dragHandleProps} className="text-slate-500 hover:text-white p-1">
                                <GripVertical className="w-5 h-5" />
                              </div>
                              <div className="text-2xl">{project.icon_emoji}</div>
                              <div>
                                <h3 className="font-semibold text-white">{project.title}</h3>
                                <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-slate-400 capitalize">
                                  {project.category}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleFeatured(project)}
                                className={`p-2 rounded-lg transition-colors ${
                                  project.is_featured ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:bg-white/5'
                                }`}
                                title="Toggle Featured"
                              >
                                <Star className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openProjectModal(project)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteProject(project.id)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}

        {/* ARTICLES TAB */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Articles</h2>
              <button
                onClick={() => openArticleModal()}
                className="flex items-center gap-2 bg-accent-purple hover:bg-accent-purple/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Article
              </button>
            </div>
            
            <div className="space-y-3">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 rounded-xl border bg-surface-low border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-accent-purple p-2 bg-accent-purple/10 rounded-lg">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{article.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${article.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                          {article.is_published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-xs text-slate-500">/{article.slug}</span>
                        <span className="text-xs text-slate-500">{article.read_time} min read</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleArticlePublish(article)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                    >
                      {article.is_published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => openArticleModal(article)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {articles.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-surface-low/50 rounded-xl border border-white/5">
                  No articles found. Create one to get started.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABOUT SECTIONS TAB */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">About Sections</h2>
              <button
                onClick={() => openAboutModal()}
                className="flex items-center gap-2 bg-accent-purple hover:bg-accent-purple/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </button>
            </div>

            <DragDropContext onDragEnd={onDragEndAbout}>
              <Droppable droppableId="about-list">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {aboutSections.map((section, index) => (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                              snapshot.isDragging 
                                ? 'bg-surface border-accent-purple/50 shadow-xl shadow-accent-purple/10 scale-[1.02]' 
                                : 'bg-surface-low border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div {...provided.dragHandleProps} className="text-slate-500 hover:text-white p-1">
                                <GripVertical className="w-5 h-5" />
                              </div>
                              <div className="w-12 h-12 bg-white/5 rounded-lg flex-shrink-0 overflow-hidden">
                                {section.image_url ? (
                                  <img src={section.image_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                                    <FileEdit className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 max-w-[500px]">
                                <h3 className="font-semibold text-white">{section.title}</h3>
                                <p className="text-xs text-slate-400 truncate mt-1">
                                  {(section.content || '').substring(0, 100)}...
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openAboutModal(section)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteAboutSection(section.id)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && profile && (
          <div className="max-w-2xl bg-surface-low border border-white/5 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.full_name || ''}
                    onChange={e => setProfile({...profile, full_name: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-accent-purple outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={profile.title || ''}
                    onChange={e => setProfile({...profile, title: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-accent-purple outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Headline</label>
                <input
                  type="text"
                  value={profile.headline || ''}
                  onChange={e => setProfile({...profile, headline: e.target.value})}
                  className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-accent-purple outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Bio</label>
                <textarea
                  value={profile.bio || ''}
                  onChange={e => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                  className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-accent-purple outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email || ''}
                    onChange={e => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-accent-purple outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">CV Upload</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleCvUpload}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer flex-1 bg-surface-low border border-white/10 hover:border-white/20 rounded-lg px-4 py-2 text-sm text-center flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload PDF
                    </label>
                    {profile.cv_url && <a href={profile.cv_url} target="_blank" rel="noreferrer" className="text-xs text-accent-purple underline">View</a>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={profile.github_url || ''}
                    onChange={e => setProfile({...profile, github_url: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-accent-purple outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={profile.linkedin_url || ''}
                    onChange={e => setProfile({...profile, linkedin_url: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-accent-purple outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={profile.available_for_work}
                  onChange={e => setProfile({...profile, available_for_work: e.target.checked})}
                  className="w-4 h-4 rounded bg-surface border-white/10 text-accent-purple focus:ring-accent-purple"
                />
                <label htmlFor="available" className="text-sm">Available for work</label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent-purple hover:bg-accent-purple/90 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* Project Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col md:flex-row bg-surface">
            
            {/* Form Section */}
            <div className="flex-1 overflow-y-auto p-6 md:border-r border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Short Description *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Long Description (Project detail hero)</label>
                  <textarea
                    rows={4}
                    value={formData.long_description || ''}
                    onChange={e => setFormData({...formData, long_description: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Content <span className="text-[10px] ml-2 opacity-60">Supports Markdown formatting</span></label>
                  <textarea
                    rows={8}
                    value={formData.content || ''}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none resize-none font-mono"
                    placeholder="Write your project details in markdown..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as any})}
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    >
                      <option value="project">Project</option>
                      <option value="research">Research</option>
                      <option value="tool">Tool</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Icon Emoji</label>
                    <input
                      type="text"
                      value={formData.icon_emoji || ''}
                      onChange={e => setFormData({...formData, icon_emoji: e.target.value})}
                      placeholder="🚀"
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Icon Color</label>
                    <select
                      value={formData.icon_color || 'purple'}
                      onChange={e => setFormData({...formData, icon_color: e.target.value})}
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    >
                      <option value="purple">Purple</option>
                      <option value="emerald">Emerald</option>
                      <option value="blue">Blue</option>
                      <option value="amber">Amber</option>
                      <option value="rose">Rose</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={e => setTechStackInput(e.target.value)}
                    placeholder="React, Next.js, Tailwind"
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                  />
                </div>

                <div className="space-y-3 p-3 bg-surface-low/50 border border-white/5 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Primary Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.image_url || ''}
                        onChange={e => setFormData({...formData, image_url: e.target.value})}
                        className="flex-1 bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                      />
                      <label className="cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-sm border border-white/10 flex items-center justify-center">
                        <Upload className="w-4 h-4" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Video URL (Max 50MB, mp4/webm)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.video_url || ''}
                        onChange={e => setFormData({...formData, video_url: e.target.value})}
                        className="flex-1 bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                      />
                      <label className="cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-sm border border-white/10 flex items-center justify-center">
                        <Upload className="w-4 h-4" />
                        <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={handleVideoUpload} />
                      </label>
                    </div>
                  </div>
                  
                  {/* Gallery Images Section */}
                  <div className="pt-2 border-t border-white/5 mt-3">
                    <label className="block text-xs font-medium text-slate-400 mb-2">Gallery Images</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(formData.gallery_urls || []).map((url, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-md overflow-hidden bg-surface border border-white/10 group">
                          <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeGalleryImage(i)}
                            className="absolute top-0.5 right-0.5 bg-black/50 hover:bg-red-500/80 rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                      <label className="w-16 h-16 rounded-md border border-dashed border-white/20 hover:border-white/40 flex flex-col items-center justify-center cursor-pointer bg-white/5 transition-colors">
                        <Plus className="w-4 h-4 text-slate-400" />
                        <span className="text-[9px] text-slate-400 mt-1">Add</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleGalleryUpload} />
                      </label>
                    </div>
                  </div>
                  
                  {uploadProgress && <div className="text-xs text-accent-purple animate-pulse">{uploadProgress}</div>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.github_url || ''}
                      onChange={e => setFormData({...formData, github_url: e.target.value})}
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Live URL</label>
                    <input
                      type="url"
                      value={formData.live_url || ''}
                      onChange={e => setFormData({...formData, live_url: e.target.value})}
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={e => setFormData({...formData, is_featured: e.target.checked})}
                    className="w-4 h-4 rounded bg-surface border-white/10 text-accent-purple focus:ring-accent-purple"
                  />
                  <label htmlFor="is_featured" className="text-sm">Featured Project</label>
                </div>

                <div className="pt-4 flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveProject}
                    disabled={isSubmitting}
                    className="bg-accent-purple hover:bg-accent-purple/90 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Project
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview Section */}
            <div className="hidden md:flex md:w-80 bg-surface-low/30 p-6 flex-col items-center justify-center relative">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 absolute top-6 left-6">Live Preview</h4>
              
              <div className="w-full max-w-[280px] bg-surface rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                {formData.video_url ? (
                  <div className="aspect-video w-full bg-black">
                     <video src={formData.video_url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                  </div>
                ) : formData.image_url ? (
                  <div className="aspect-video w-full bg-surface-low">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-surface-low flex items-center justify-center text-slate-600 text-sm">
                    No Media
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{formData.icon_emoji || '📄'}</span>
                    <h5 className="font-bold text-white text-sm line-clamp-1">{formData.title || 'Project Title'}</h5>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {formData.description || 'Project description will appear here...'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {techStackInput.split(',').filter(s => s.trim()).slice(0,3).map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-slate-300">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Form Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col bg-surface">
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingArticle ? 'Edit Article' : 'New Article'}
                </h3>
                <button onClick={() => setIsArticleModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={articleForm.title}
                      onChange={handleArticleTitleChange}
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={articleForm.slug}
                      onChange={e => setArticleForm({...articleForm, slug: e.target.value})}
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Summary</label>
                  <textarea
                    rows={3}
                    value={articleForm.summary || ''}
                    onChange={e => setArticleForm({...articleForm, summary: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Content <span className="text-[10px] ml-2 opacity-60">Write in Markdown</span></label>
                  <textarea
                    rows={10}
                    value={articleForm.content}
                    onChange={e => setArticleForm({...articleForm, content: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none resize-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Cover Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={articleForm.cover_image_url || ''}
                        onChange={e => setArticleForm({...articleForm, cover_image_url: e.target.value})}
                        className="flex-1 bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                      />
                      <label className="cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-sm border border-white/10 flex items-center justify-center">
                        <Upload className="w-4 h-4" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleArticleCoverUpload} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Read Time (minutes)</label>
                    <input
                      type="number"
                      min={1}
                      value={articleForm.read_time}
                      onChange={e => setArticleForm({...articleForm, read_time: parseInt(e.target.value) || 5})}
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={articleForm.is_published}
                    onChange={e => setArticleForm({...articleForm, is_published: e.target.checked})}
                    className="w-4 h-4 rounded bg-surface border-white/10 text-accent-purple focus:ring-accent-purple"
                  />
                  <label htmlFor="is_published" className="text-sm">Is Published</label>
                </div>

                {uploadProgress && <div className="text-xs text-accent-purple animate-pulse">{uploadProgress}</div>}
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-surface-low flex justify-end gap-3">
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveArticle}
                disabled={isSubmitting}
                className="bg-accent-purple hover:bg-accent-purple/90 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Section Form Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl overflow-hidden rounded-2xl flex flex-col bg-surface">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingAboutSection ? 'Edit Section' : 'New Section'}
                </h3>
                <button onClick={() => setIsAboutModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={aboutForm.title}
                    onChange={e => setAboutForm({...aboutForm, title: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Content <span className="text-[10px] ml-2 opacity-60">Write in Markdown</span></label>
                  <textarea
                    required
                    rows={6}
                    value={aboutForm.content}
                    onChange={e => setAboutForm({...aboutForm, content: e.target.value})}
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none resize-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={aboutForm.image_url || ''}
                        onChange={e => setAboutForm({...aboutForm, image_url: e.target.value})}
                        className="flex-1 bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                      />
                      <label className="cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-sm border border-white/10 flex items-center justify-center">
                        <Upload className="w-4 h-4" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleAboutImageUpload} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={aboutForm.sort_order}
                      onChange={e => setAboutForm({...aboutForm, sort_order: parseInt(e.target.value) || 0})}
                      className="w-full bg-surface-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-accent-purple outline-none"
                    />
                  </div>
                </div>

                {uploadProgress && <div className="text-xs text-accent-purple animate-pulse">{uploadProgress}</div>}
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-surface-low flex justify-end gap-3">
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveAboutSection}
                disabled={isSubmitting}
                className="bg-accent-purple hover:bg-accent-purple/90 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-bottom-5 z-[60] ${
          toastMsg.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {toastMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="text-sm font-medium">{toastMsg.message}</p>
          <button onClick={() => setToastMsg(null)} className="ml-2 opacity-50 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
