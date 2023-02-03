using Application.Photos;
using Application.Services.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<List<PhotoUploadResultDto>> AddPhoto(IFormFile[] files)
        {
            if (files is null) return new List<PhotoUploadResultDto>();
            if (files.Length > 0)
            {
                List<PhotoUploadResultDto> uploadResults = new List<PhotoUploadResultDto>();
                foreach (var file in files)
                {
                    await using var stream = file.OpenReadStream();
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                    };
                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                    if (uploadResult.Error != null)
                    {
                        throw new Exception(uploadResult.Error.Message);
                    }
                    uploadResults.Add(GetUploadedResult(uploadResult));
                }
                return uploadResults;
            }
            return new List<PhotoUploadResultDto>();
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }

        private PhotoUploadResultDto GetUploadedResult(ImageUploadResult result)
        {
            return new PhotoUploadResultDto
            {
                PublicId = result.PublicId,
                Url = result.SecureUrl.ToString()
            };
        }

    }
}
