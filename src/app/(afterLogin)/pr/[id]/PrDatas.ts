import { PrDetailedData } from "./types";

export const PR_DETAILED_DATA: PrDetailedData = {
  title: 'Database Connector 싱글톤 패턴 구현',
  commits: [
      { hash: 'a1b2c3d', message: 'Add DatabaseConnector singleton class' },
      { hash: 'e4f5g6h', message: 'Implement connection pool' },
      { hash: 'i7j8k9l', message: 'Add configuration loader' }
  ],
  changedFiles: [
      {
          name: 'src/main/java/com/example/database/DatabaseConnector.java',
          language: 'java',
          changes: [
              {
                  type: 'addition',
                  content: 'package com.example.database;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: 'import java.sql.Connection;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: 'import java.sql.SQLException;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: 'import com.zaxxer.hikari.HikariConfig;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: 'import com.zaxxer.hikari.HikariDataSource;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: '@ThreadSafe',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: 'public final class DatabaseConnector {',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: '    private static volatile DatabaseConnector instance;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '    private final HikariDataSource dataSource;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: '    private DatabaseConnector() {',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: '        HikariConfig config = loadConfiguration();',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '        this.dataSource = new HikariDataSource(config);',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '    }',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '}',
                  highlight: { color: 'text-black' }
              }
          ]
      },
      {
          name: 'src/main/java/com/example/database/DatabaseConfig.java',
          language: 'java',
          changes: [
              {
                  type: 'addition',
                  content: 'package com.example.database;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: 'import java.io.IOException;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: 'import java.util.Properties;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: 'public class DatabaseConfig {',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: '    private static final String CONFIG_FILE = "database.properties";',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: '    public static Properties loadProperties() throws IOException {',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: '        Properties props = new Properties();',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '        ClassLoader loader = Thread.currentThread().getContextClassLoader();',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '        props.load(loader.getResourceAsStream(CONFIG_FILE));',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '        return props;',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '    }',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '}',
                  highlight: { color: 'text-black' }
              }
          ]
      }
  ],
  reviewComments: [
      {
          id: 1,
          comment: "The singleton implementation looks good, but have you considered using double-checked locking for better thread safety? Also, what happens if the connection pool exhausts all available connections?"
      },
      {
          id: 2,
          comment: "I noticed you're loading the configuration file in the constructor. This might cause issues if the file is not found. Could you add some error handling and maybe make the file path configurable?"
      }
  ]
};