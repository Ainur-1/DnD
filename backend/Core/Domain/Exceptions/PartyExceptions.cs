using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class PartyExceptions
    {
        public class PartyAlreadyExistsException : Exception
        {
            public PartyAlreadyExistsException(string accessCode)
                : base($"A party with access code '{accessCode}' already exists.")
            {
            }
        }

        public class PartyNotFoundException : Exception
        {
            public PartyNotFoundException(Guid partyId)
                : base($"The party with ID '{partyId}' was not found.")
            {
            }
        }

        public class InvalidAccessCodeException : Exception
        {
            public InvalidAccessCodeException(string accessCode)
                : base($"The access code '{accessCode}' is invalid.")
            {
            }
        }
    }
}
