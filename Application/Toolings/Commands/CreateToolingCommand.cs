using Application.Core;
using Domain;
using MediatR;

namespace Application.Toolings.Commands
{

    // a command following the  CQRS pattern allos to modify the database
    public class CreateToolingCommand : IRequest<Tooling>
    {
        public string TNumber { get; set; }
        public string PSNumber { get; set; }
        public int Quantity { get; set; }
        public string Department { get; set; }
        public string Note { get; set; }
        public bool IsInProduction { get; set; }
        public int NumberOfImpressions { get; set; }
        public string PunnetNumber { get; set; }
        
        internal Tooling CreateTooling()
        {
            return new Tooling
            {
                TNumber = TNumber,
                PSNumber = PSNumber,
                Quantity = Quantity,
                Department = Department,
                Note = Note,
                IsInProduction = IsInProduction,
                NumberOfImpressions = NumberOfImpressions,
                PunnetNumber = PunnetNumber
            };
        }
    }
}
