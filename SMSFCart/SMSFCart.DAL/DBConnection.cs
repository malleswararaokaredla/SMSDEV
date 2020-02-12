using SMSFCart.BOL;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;

namespace SMSFCart.DAL
{
    public class DBConnection
    {
        public SqlConnection ms_Connection;
        public static string strcon;
    /// <summary>
    /// Connections this instance.
    /// </summary>
    /// <returns></returns>
    public SqlConnection Connection()
        {
            try
            {
                if (ms_Connection != null)
                {
                    return ms_Connection;
                }
                else
                {
                    return OpenConnection();
                }
            }
            catch (SqlException ex)
            {
                //Handle SQL exceptions
                Console.WriteLine(ex.Message + "  in DBConnection Connection()");
                //.WriteTrace(ex.Message + "  in DBConnection Connection()");
            }
            catch (Exception ex)
            {
                //Handle exceptions
                Console.WriteLine(ex.Message + "  in DBConnection Connection()");
                // .WriteTrace(ex.Message + "  in DBConnection Connection()");
            }
            return ms_Connection;
        }
        /// <summary>
        /// Opens the connection.
        /// </summary>
        /// <returns></returns>
        public SqlConnection OpenConnection()
        {
            try
            {

                string strConnectionString;

                var configurationBuilder = new ConfigurationBuilder();
                var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
                configurationBuilder.AddJsonFile(path, false);
                
                var root = configurationBuilder.Build();
                strConnectionString = root.GetConnectionString("ConnectionString");

                ms_Connection = new SqlConnection(strConnectionString);
                ms_Connection.Open();
            }
            catch (SqlException ex)
            {
                //Handle SQL exceptions
                Console.WriteLine(ex.Message + "  in DBConnection OpenConnection()");
                // .WriteTrace(ex.Message + "  in DBConnection OpenConnection()");
            }
            catch (Exception ex)
            {
                //Handle exceptions
                Console.WriteLine(ex.Message + "  in DBConnection Connection()");
                // .WriteTrace(ex.Message + "  in DBConnection OpenConnection()");
            }
            return ms_Connection;
        }
    /// <summary>
    /// Closes the connection.
    /// </summary>
    ///
    public string Sconnection()
    {
     

      var configurationBuilder = new ConfigurationBuilder();
      var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
      configurationBuilder.AddJsonFile(path, false);

      var root = configurationBuilder.Build();
      strcon = root.GetConnectionString("ConnectionString");
            
         
      return strcon;
    }

    public void CloseConnection()
        {
            try
            {
                if ((ms_Connection != null))
                {
                    if (ms_Connection != null & ms_Connection.State == ConnectionState.Open
                        )
                    {
                        ms_Connection.Close();
                    }
                    ms_Connection = null;
                }
            }
            catch (SqlException ex)
            {
                //Handle SQL exceptions
                Console.WriteLine(ex.Message + "  in DBConnection CloseConnection()");
                // .WriteTrace(ex.Message + "  in DBConnection CloseConnection()");
            }
            catch (Exception ex)
            {
                //Handle exceptions
                Console.WriteLine(ex.Message + "  in DBConnection CloseConnection()");
                // .WriteTrace(ex.Message + "  in DBConnection CloseConnection()");
            }
        }
    }
}
