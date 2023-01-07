using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<List<PhotoUploadResult>> AddPhoto(IFormFile[] files);
        Task<string> DeletePhoto(string publicId);
    }
}