param(
    [Parameter(Mandatory = $true)]
    [string]$Root,

    [int]$Port = 8099
)

$ErrorActionPreference = 'Stop'

$rootPath = [System.IO.Path]::GetFullPath($Root)
$url = "http://127.0.0.1:$Port/index.html"

Add-Type -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;

public static class WufengStaticServer
{
    private static readonly Dictionary<string, string> MimeTypes =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { ".html", "text/html; charset=utf-8" },
            { ".css", "text/css; charset=utf-8" },
            { ".js", "application/javascript; charset=utf-8" },
            { ".png", "image/png" },
            { ".jpg", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".jfif", "image/jpeg" },
            { ".gif", "image/gif" },
            { ".mp4", "video/mp4" },
            { ".txt", "text/plain; charset=utf-8" }
        };

    public static void Run(string root, int port)
    {
        string rootPath = Path.GetFullPath(root).TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        string prefix = "http://127.0.0.1:" + port + "/";
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add(prefix);
        listener.Start();

        Console.WriteLine("Wufeng site is running at " + prefix + "index.html");
        Console.WriteLine("Keep this window open while using the website.");

        while (listener.IsListening)
        {
            HttpListenerContext context = listener.GetContext();
            ThreadPool.QueueUserWorkItem(delegate { Handle(context, rootPath); });
        }
    }

    private static void Handle(HttpListenerContext context, string rootPath)
    {
        HttpListenerResponse response = context.Response;

        try
        {
            string requestPath = Uri.UnescapeDataString(context.Request.Url.AbsolutePath.TrimStart('/'));
            if (string.IsNullOrWhiteSpace(requestPath))
            {
                requestPath = "index.html";
            }

            string filePath = Path.GetFullPath(Path.Combine(rootPath, requestPath));
            if (!filePath.StartsWith(rootPath, StringComparison.OrdinalIgnoreCase))
            {
                SendText(response, 403, "403 Forbidden");
                return;
            }

            if (!File.Exists(filePath))
            {
                SendText(response, 404, "404 Not Found");
                return;
            }

            string extension = Path.GetExtension(filePath);
            string contentType;
            if (!MimeTypes.TryGetValue(extension, out contentType))
            {
                contentType = "application/octet-stream";
            }

            byte[] bytes = File.ReadAllBytes(filePath);
            response.StatusCode = 200;
            response.ContentType = contentType;
            response.ContentLength64 = bytes.Length;
            response.OutputStream.Write(bytes, 0, bytes.Length);
        }
        catch
        {
            if (response.OutputStream.CanWrite)
            {
                SendText(response, 500, "500 Internal Server Error");
            }
        }
        finally
        {
            response.OutputStream.Close();
        }
    }

    private static void SendText(HttpListenerResponse response, int statusCode, string text)
    {
        byte[] bytes = Encoding.UTF8.GetBytes(text);
        response.StatusCode = statusCode;
        response.ContentType = "text/plain; charset=utf-8";
        response.ContentLength64 = bytes.Length;
        response.OutputStream.Write(bytes, 0, bytes.Length);
    }
}
"@

try {
    [WufengStaticServer]::Run($rootPath, $Port)
} catch {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            Write-Host "Website is already running at $url"
            Start-Process $url
            exit 0
        }
    } catch {
    }

    Write-Host "Cannot start http://127.0.0.1:$Port/"
    Write-Host $_.Exception.Message
    Read-Host 'Press Enter to close'
    exit 1
}
