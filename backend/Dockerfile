FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS restore
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Core/Contracts/Contracts.csproj", "Core/Contracts/"]
COPY ["Core/Services.Abstractions/Services.Abstractions.csproj", "Core/Services.Abstractions/"]
COPY ["Core/Domain/Domain.csproj", "Core/Domain/"]
COPY ["Infrastructure/DataAccess/DataAccess.csproj", "Infrastructure/DataAccess/"]
COPY ["Infrastructure/GameHub/GameHub.csproj", "Infrastructure/GameHub/"]
COPY ["Infrastructure/Services.Implementation/Services.Implementation.csproj", "Infrastructure/Services.Implementation/"]
COPY ["Infrastructure/Mappings/Mappings.csproj", "Infrastructure/Mappings/"]
COPY ["DnD/DnD.csproj", "DnD/"]
RUN dotnet restore "./DnD/DnD.csproj"

FROM restore as build
COPY . .
RUN dotnet build "DnD/DnD.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "DnD/DnD.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DnD.dll"]