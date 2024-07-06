
namespace DnD.GraphQL
{
    public class SignInPayload
    {
        private List<string> list;

        public SignInPayload(List<string> list)
        {
            this.list = list;
        }

        public SignInPayload(string s)
        {
        }
    }
}