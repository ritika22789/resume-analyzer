import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading, auth.isAuthenticated]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to wipe all app data? This action cannot be undone.")) return;

    setIsDeleting(true);
    try {
      for (const file of files) {
        await fs.delete(file.path);
      }
      await kv.flush();
      await loadFiles();
    } catch (err) {
      console.error("Error wiping data:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-16 text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-16 text-red-500">
        <p>Error: {error}</p>
        <button className="mt-4 text-blue-500 underline" onClick={clearError}>
          Clear
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-red-600">Wipe App Data</h1>
        <p className="text-gray-600">
          Authenticated as: <span className="font-medium">{auth.user?.username}</span>
        </p>

        <div>
          <h2 className="text-lg font-semibold mb-2">Existing Files:</h2>
          {files.length === 0 ? (
            <p className="text-gray-500">No files found.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-row gap-4 p-2 border border-gray-200 rounded-lg items-center"
                >
                  <p className="truncate">{file.name}</p>
                  <p className="text-gray-400 text-sm">{file.path}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={`w-full py-3 rounded-xl font-semibold text-white ${
            isDeleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Wipe App Data"}
        </button>
      </div>
    </main>
  );
};

export default WipeApp;
