interface WorkerResponse {
  mermaidSyntax: string;
  shareUrl?: string;
  diagramId?: string;
}

interface WorkerErrorResponse {
  error: string;
}

export async function analyzeCharactersFromWorker(
  bookTitle: string,
  author: string,
  workerUrl: string
): Promise<WorkerResponse> {
  if (!workerUrl) {
    throw new Error('Cloudflare Worker URL is required. Set CLOUDFLARE_WORKER_URL in your .env file');
  }

  try {
    const response = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookTitle,
        author,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' })) as WorkerErrorResponse;
      throw new Error(errorData.error || `Worker returned status ${response.status}`);
    }

    const data = await response.json() as WorkerResponse;
    
    if (!data.mermaidSyntax) {
      throw new Error('Invalid response from worker: missing mermaidSyntax');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from worker: ${error.message}`);
    }
    throw new Error('Failed to fetch from worker: Unknown error');
  }
}

export async function uploadAsciiToWorker(
  diagramId: string,
  ascii: string,
  bookTitle: string,
  author: string,
  workerUrl: string
): Promise<void> {
  try {
    const response = await fetch(`${workerUrl}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diagramId,
        ascii,
        bookTitle,
        author,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to upload ASCII: ${response.status}`);
    }
  } catch (error) {
    // Non-fatal error, just log it
    console.error('Could not upload ASCII to worker:', error);
  }
}
