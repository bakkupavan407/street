using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Security.Cryptography;

/// <summary>
/// Summary description for myEncryption
/// </summary>
public class myEncryption
{
	public myEncryption()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string getMD5Hash(string str)
    {
        MD5CryptoServiceProvider hash = new MD5CryptoServiceProvider();
        byte[] byteshash = System.Text.Encoding.ASCII.GetBytes(str);
        byteshash = hash.ComputeHash(byteshash);
        string result = "";
        foreach (byte b in byteshash)
        {
            result += b.ToString("x2");
        }
        return result;
    }
}