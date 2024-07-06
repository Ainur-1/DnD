using Microsoft.AspNetCore.Identity;

namespace DnD.GraphQL
{
    public class SignUpPayload
    {
        private IdentityResult result;

        public SignUpPayload(IdentityResult result)
        {
            this.result = result;
        }
    }
}