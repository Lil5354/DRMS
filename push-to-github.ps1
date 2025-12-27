# Script to push code to GitHub branch Thao
# Instructions:
# 1. Create new repository on GitHub (if not exists)
# 2. Copy repository URL (e.g., https://github.com/username/repo-name.git)
# 3. Run this script and enter URL when prompted

Write-Host "=== Push DRMS to GitHub branch Thao ===" -ForegroundColor Green
Write-Host ""

# Check if remote exists
$remoteUrl = git config --get remote.origin.url

if ($remoteUrl) {
    Write-Host "Found remote: $remoteUrl" -ForegroundColor Yellow
    $useExisting = Read-Host "Use this remote? (y/n)"
    if ($useExisting -ne "y") {
        $remoteUrl = $null
    }
}

if (-not $remoteUrl) {
    Write-Host "No remote repository found." -ForegroundColor Yellow
    Write-Host "Please create repository on GitHub first:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/new" -ForegroundColor Cyan
    Write-Host "2. Create new repository (don't initialize with README, .gitignore, license)" -ForegroundColor Cyan
    Write-Host "3. Copy repository URL" -ForegroundColor Cyan
    Write-Host ""
    $remoteUrl = Read-Host "Enter GitHub repository URL (e.g., https://github.com/username/repo-name.git)"
    
    if ($remoteUrl) {
        Write-Host "Adding remote origin..." -ForegroundColor Green
        git remote add origin $remoteUrl
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Remote exists, updating..." -ForegroundColor Yellow
            git remote set-url origin $remoteUrl
        }
    } else {
        Write-Host "No URL provided, cannot continue." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Pushing branch Thao to GitHub..." -ForegroundColor Green
git push -u origin Thao

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Successfully pushed to GitHub branch Thao!" -ForegroundColor Green
    Write-Host "Repository URL: $remoteUrl" -ForegroundColor Cyan
    Write-Host "Branch: Thao" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Error occurred while pushing." -ForegroundColor Red
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "1. Are you logged in to GitHub?" -ForegroundColor Yellow
    Write-Host "2. Is the repository URL correct?" -ForegroundColor Yellow
    Write-Host "3. Do you have access to the repository?" -ForegroundColor Yellow
}
