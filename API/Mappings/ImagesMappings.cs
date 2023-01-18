using Application.DTOs.ImageDTO;
using Application.DTOs.Images;
using Application.Photos.Commands;
using AutoMapper;
using Domain;

namespace API.Mappings
{
    public class ImagesMappings : Profile
    {
        public ImagesMappings()
        {
            CreateMap<Image, ImageDto>();
            CreateMap<ImageDto, Image>();
            CreateMap<AddImagesDto, AddImagesCommand>();
            CreateMap<DeleteImageDto, DeleteImagesCommand>();
            CreateMap<SetMainDto, SetMainImageCommand>();
            CreateMap<SetMainDto, UnsetMainImageCommand>();
        }
    }
}
