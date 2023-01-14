using API.DTOs.Toolings;
using Application.DTOs.ToolingDTO;
using Application.Toolings.Commands;
using AutoMapper;
using Domain;

namespace API.Mappings
{
    public class ToolingMappings : Profile
    {
        public ToolingMappings()
        {
            CreateMap<PutPostToolingDto, CreateToolingCommand>();
            CreateMap<PutPostToolingDto, UpdateToolingCommand>();
            CreateMap<Tooling, GetToolingDto>()
            .ForMember(x => x.Images, o => o.MapFrom(x => x.Images))
            .ForMember(x => x.Products, o => o.MapFrom(x => x.Products));
        }
    }
}
