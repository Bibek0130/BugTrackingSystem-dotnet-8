#Frontend build
From node:20 AS client-build

ENV DOCKER=true
ENV NODE_ENV=production

WORKDIR /client
#copy only package files first for caching
COPY bugtrackingsystem.client/package*.json ./
RUN npm install --include=dev

#copy rest of the frontend
COPY bugtrackingsystem.client .
RUN npm run build

#Backend build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app
#copy only the backend project files first for caching
COPY BugTrackingSystem.Server ./BugTrackingSystem.Server

#copy a solution file if exists
COPY *.sln ./

#copy frontend build output to wwwroot
COPY --from=client-build /client/dist ./BugTrackingSystem.Server/wwwroot

RUN dotnet publish BugTrackingSystem.Server/BugTrackingSystem.Server.csproj -c Release -o out

#Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app
COPY --from=build /app/out .

ENV ASPNETCORE_URLS=http://+:$PORT

CMD ["dotnet", "BugTrackingSystem.Server.dll"]