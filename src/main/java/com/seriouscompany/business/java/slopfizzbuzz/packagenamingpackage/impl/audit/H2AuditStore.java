package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * JDBC custody for audit entries, committed one certificate at a time.
 */
public final class H2AuditStore implements OutputAuditStore {

	private final String jdbcUrl;

	public boolean isDurable() {
		return this.jdbcUrl.startsWith("jdbc:h2:file:");
	}

	public H2AuditStore(final String jdbcUrl) {
		this.jdbcUrl = jdbcUrl;
		try (Connection connection = DriverManager.getConnection(this.jdbcUrl);
				Statement statement = connection.createStatement()) {
			statement.execute("CREATE TABLE IF NOT EXISTS output_audit ("
					+ "sequence_number BIGINT PRIMARY KEY, "
					+ "number_value INT NOT NULL, "
					+ "payload CLOB NOT NULL, "
					+ "disposition VARCHAR(16) NOT NULL, "
					+ "previous_digest VARCHAR(64) NOT NULL, "
					+ "digest VARCHAR(64) NOT NULL)");
		} catch (final SQLException failure) {
			throw new IllegalStateException("The audit repository could not be chartered.", failure);
		}
	}

	@Override
	public List<OutputAuditEntry> load() {
		final List<OutputAuditEntry> entries = new ArrayList<OutputAuditEntry>();
		try (Connection connection = DriverManager.getConnection(this.jdbcUrl);
				Statement statement = connection.createStatement();
				ResultSet rows = statement.executeQuery(
						"SELECT sequence_number, number_value, payload, disposition, "
						+ "previous_digest, digest FROM output_audit ORDER BY sequence_number")) {
			while (rows.next()) {
				entries.add(new OutputAuditEntry(rows.getLong(1), rows.getInt(2), rows.getString(3),
						OutputDisposition.valueOf(rows.getString(4)), rows.getString(5), rows.getString(6)));
			}
			return entries;
		} catch (final SQLException failure) {
			throw new IllegalStateException("The audit repository could not be read.", failure);
		}
	}

	@Override
	public void append(final OutputAuditEntry entry) {
		try (Connection connection = DriverManager.getConnection(this.jdbcUrl)) {
			connection.setAutoCommit(false);
			try (PreparedStatement statement = connection.prepareStatement(
					"INSERT INTO output_audit (sequence_number, number_value, payload, "
					+ "disposition, previous_digest, digest) VALUES (?, ?, ?, ?, ?, ?)")) {
				statement.setLong(1, entry.getSequence());
				statement.setInt(2, entry.getNumber());
				statement.setString(3, entry.getPayload());
				statement.setString(4, entry.getDisposition().name());
				statement.setString(5, entry.getPreviousDigest());
				statement.setString(6, entry.getDigest());
				statement.executeUpdate();
				connection.commit();
			} catch (final SQLException failure) {
				connection.rollback();
				throw failure;
			}
		} catch (final SQLException failure) {
			throw new IllegalStateException("The audit certificate could not be committed.", failure);
		}
	}
}
